import express from 'express';
import path from 'path';
import multer from 'multer';
import ajv from 'ajv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import MailSender from './server/mailSender';
import fileFilter from './server/fileFilterHelper';
import uploadsCleanup from './server/uploadsCleanupHelper';
import logger from './server/logger';
import validationSchema from './server/mailDataSchema.json';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? process.env.DEV_PORT : process.env.PORT;
const validator = ajv();
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

	// change default logging level for dev env
	logger.level = 'debug';

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', (req, res) => {
		middleware.fileSystem.readFile(pathToIndex, (error, data) => {
			if (error) {
				logger.error(error);
				res.send(error);
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
		const files = req.files;
		const messageBody = req.body;

		// check for any file upload errors
		if (uploadError) {
			logger.error(uploadError);
			res.send(uploadError);
			uploadsCleanup(files);
			return;
		}

		// validate request body against email message schema
		if (validator.validate(validationSchema, messageBody) === false) {
			logger.error(validator.errors);
			res.send(validator.errors);
			uploadsCleanup(files);
			return;
		}

		mailSender.send(
			MailSender.createMessage(process.env.TARGET_EMAIL, messageBody, MailSender.sanitizeAttachments(files)),
			(mailSenderError, info) => {
				if (mailSenderError) {
					logger.error(mailSenderError);
					res.send(mailSenderError);
					uploadsCleanup(files);
					return;
				}

				logger.debug(`Message sent: ${info.response}`);
				res.send('Mail send');
				uploadsCleanup(files);
			}
		);
	});
});

app.listen(port, error => {
	if (error) {
		logger.error(error);
	}
	logger.info(`Server listening on port ${port}!`);
});
