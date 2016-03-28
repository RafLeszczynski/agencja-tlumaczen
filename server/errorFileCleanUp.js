import uploadsCleanup from './uploadsCleanupHelper';

/**
 * @desc cleaup files on sendMessage error
 * @param {Object} error - node error Object
 * @param {Object} request - express request object
 * @param {Object} response - express response object
 * @param {Function} next - express next callback
 */
export default (error, request, response, next) => {
	const files = request.files;

	if (error && files) {
		uploadsCleanup(files);
	}

	next(error);
};
