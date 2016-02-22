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
 * @desc checks if given file has supported mime type
 * @param {Object} req - HTTP request object
 * @param {Object} file - file data object
 * @param {Function} cb - callback function
 * @returns {void}
 */
export default (req, file, cb) => {
	const mimeType = file.mimetype;
	const negativeIndex = -1;

	if (supportedTypes.indexOf(mimeType) === negativeIndex) {
		cb(new Error(`File format ${mimeType} not supported`));
		return;
	}

	cb(null, true);
};
