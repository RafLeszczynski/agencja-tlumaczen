const defaultStatusCode = 500;

/**
 *@desc creates error response JSON object
 * @param {Object} error - node error object
 * @returns {Object} - error response JSON object
 */
export function createErrorResponseJsonObject(error) {
	return {
		message: error.message,
		errorCode: error.errorCode,
		details: error.details
	};
}

/**
 * @desc custom error handler express js middleware
 * @param {Object} error - node error Object
 * @param {Object} request - express request object
 * @param {Object} response - express response object
 * @param {Function} next - express next callback
 * @returns {void}
 */
export default (error, request, response, next) => {
	response.status(error.statusCode || defaultStatusCode).json(createErrorResponseJsonObject(error));
};
