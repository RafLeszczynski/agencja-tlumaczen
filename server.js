// external modules
import ajv from 'ajv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';

// internal modules
import CustomError from './server/customError';
import errorHandler from './server/errorHandler';
import errorLogger from './server/errorLogger';
import fileFilter from './server/fileFilterHelper';
import logger from './server/logger';
import MailSender from './server/mailSender';
import onErrorFileCleanUp from './server/onErrorFileCleanUp';
import uploadsCleanup from './server/uploadsCleanupHelper';
import validationSchema from './server/mailDataSchema.json';
import webpackConfig from './webpack.config.js';

const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const mailSender = new MailSender(process.env.GMAIL_USER, process.env.GMAIL_PASS);
const multerOptions = {
	dest: process.env.UPLOAD_DIR,
	limits: {
		fieldSize: process.env.MAX_UPLOAD_SIZE
	},
	fileFilter
};
const pathToIndex = path.join(__dirname, 'build/index.html');
const port = isDeveloping ? process.env.DEV_PORT : process.env.PORT;
const upload = multer(multerOptions).array('files', process.env.MAX_FILE_COUNT);
const validator = ajv();

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
	app.get('*', (req, res, next) => {
		middleware.fileSystem.readFile(pathToIndex, (error, data) => {
			if (error) {
				next(new CustomError('Webpack Middleware read file error', 500, 500, error));
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

app.post('/sendMessage', (req, res, next) => {
	upload(req, res, uploadError => {
		const files = req.files;
		const messageBody = req.body;

		// check for any file upload errors
		if (uploadError) {
			next(new CustomError('File upload error', 400, 400, uploadError));
			return;
		}

		// validate request body against email message schema
		if (validator.validate(validationSchema, messageBody) === false) {
			next(new CustomError('Form validation Error', 400, 400, validator.errors));
			return;
		}

		mailSender.send(
			MailSender.createMessage(process.env.TARGET_EMAIL, messageBody, MailSender.sanitizeAttachments(files)),
			(mailSenderError, info) => {
				if (mailSenderError) {
					next(new CustomError('Mail Sender Error', 500, 500, mailSenderError));
					return;
				}

				logger.debug(`Message sent: ${info.response}`);
				res.send('Mail send');
				uploadsCleanup(files);
			}
		);
	});
});

app.use(onErrorFileCleanUp);
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, error => {
	if (error) {
		logger.error(error);
	}
	logger.info(`Server listening on port ${port}!`);
});
