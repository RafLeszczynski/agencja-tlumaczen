import {supportedTypes} from '../config.json';

export default function (req, file, cb) {
	const mimetype = file.mimetype;

	if (supportedTypes.indexOf(mimetype) === -1) {
		cb(new Error(`File format ${mimetype} not supported`));
	} else {
		cb(null, true);
	}
}
