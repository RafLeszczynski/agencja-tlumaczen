export const supportedTypes = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/msword',
	'application/vnd.oasis.opendocument.text',
	'image/png',
	'application/rtf',
	'image/jpeg'
];

/**
 * @desc creates error details object
 * @param {String} fileName - original file name
 * @param {String} mimeType - file mime type
 * @returns {Object} - error object
 */
export function createUnsupportedTypeErrorObject(fileName, mimeType) {
	return {
		message: 'File format not supported',
		fileName,
		mimeType
	}
}

/**
 * @desc checks if given file has supported mime type
 * @param {Object} req - HTTP request object
 * @param {Object} file - file data object
 * @param {Function} cb - callback function
 * @returns {void}
 */
export default (req, file, cb) => {
	const mimeType = file.mimetype;
	const negativeIndex = -1;
	const unsupportedFileTypeKey = 'unsupportedFileTypeErrors';

	if (supportedTypes.indexOf(mimeType) === negativeIndex) {
		if (req.hasOwnProperty(unsupportedFileTypeKey) !== true) {
			req[unsupportedFileTypeKey] = [];
		}
		req[unsupportedFileTypeKey].push(createUnsupportedTypeErrorObject(file.originalname, mimeType));
		cb(null, false);
	} else {
		cb(null, true);
	}
};
