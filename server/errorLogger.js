import logger from './logger';

/**
 * @desc creates error message template for logging errors
 * @param {String} errorMessage - original error message
 * @returns {string} - error message template
 */
function createErrorMessageTemplate(errorMessage) {
	return [
		errorMessage,
		'details: %j',
		'context: %j',
		'stacktrace for: %s'
	].join('\n');
}

/**
 * @desc custom error logger express js middleware
 * @param {Object} error - node error Object
 * @param {Object} request - express request object
 * @param {Object} response - express response object
 * @param {Function} next - express next callback
 */
export default (error, request, response, next) => {
	logger.error(
		createErrorMessageTemplate(error.message),
		error.details,
		{
			body: request.body,
			files: request.files
		},
		error.stack
	);

	next(error);
};
