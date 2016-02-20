import fs from 'fs';
import express from 'express';
import path from 'path';
import multer from 'multer';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import * as config from './config.json';
import MailSender from './server/mailSender';
import fileFilter from './server/fileFilterHelper';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? config.devPort : process.env.PORT;
const app = express();
const mailSender = new MailSender(config.gmailUser, config.gmailPass);
const multerOptions = {
	dest: config.uploadDir,
	limits: {
		fieldSize: config.maxUploadSize
	},
	fileFilter
};
const upload = multer(multerOptions).array('files', config.maxFileNumber);

function removeTempFiles(files) {
	files.map(file => {
		fs.unlink(file.path, (error) => {
			console.log(error);
		});
	})
}

if (isDeveloping) {
	const compiler = webpack(webpackConfig);
	const middleware = webpackMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
		res.end();
	});
} else {
	app.use(express.static(__dirname + '/build'));
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'build/index.html'));
	});
}

app.post('/sendMessage', (req, res) => {
	upload(req, res, function (error) {
		if (error) {
			res.send(error);
			return console.log(error);
		}

		mailSender.send(
			MailSender.createMessage(config.targetEmail, req.body, MailSender.sanitizeAttachments(req.files)),
			(error, info) => {
				if (error) {
					res.send('Error');
					return console.log(error);
				}

				removeTempFiles(req.files);

				console.log(`Message sent: ${info.response}`);
				res.send('Mail send');
			}
		);
	});
});

app.listen(port, (error) => {
	if (error) {
		console.log(error);
	}
	console.info(`Server listening on port ${port}!`);
});
