import express from 'express';
import path from 'path';
import multer from 'multer';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import MailSender from './server/mailSender';
import fileFilter from './server/fileFilterHelper';
import uploadsCleanup from './server/uploadsCleanupHelper';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? process.env.DEV_PORT : process.env.PORT;
const app = express();
const mailSender = new MailSender(process.env.GMAIL_USER, process.env.GMAIL_PASS);
const multerOptions = {
	dest: process.env.UPLOAD_DIR,
	limits: {
		fieldSize: process.env.MAX_UPLOAD_SIZE
	},
	fileFilter
};
const upload = multer(multerOptions).array('files', process.env.MAX_FILE_COUNT);
const pathToIndex = path.join(__dirname, 'build/index.html');

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
	app.get('*', (req, res) => {
		middleware.fileSystem.readFile(pathToIndex, (error, data) => {
			if (error) {
				res.send(error);
				console.log(error);
				return;
			}

			res.send(data);
		});
	});
} else {
	app.use(express.static(path.join(__dirname, '/build')));
	app.get('*', (req, res) => {
		res.sendFile(pathToIndex);
	});
}

app.post('/sendMessage', (req, res) => {
	upload(req, res, uploadError => {
		if (uploadError) {
			res.send(uploadError);
			console.log(uploadError);
			return;
		}

		mailSender.send(
			MailSender.createMessage(process.env.TARGET_EMAIL, req.body, MailSender.sanitizeAttachments(req.files)),
			(mailSenderError, info) => {
				if (mailSenderError) {
					res.send(mailSenderError);
					console.log(mailSenderError);
					return;
				}

				uploadsCleanup(req.files);

				console.log(`Message sent: ${info.response}`);
				res.send('Mail send');
			}
		);
	});
});

app.listen(port, error => {
	if (error) {
		console.log(error);
	}
	console.info(`Server listening on port ${port}!`);
});
