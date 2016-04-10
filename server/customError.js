/**
 * custom error object
 */
export default class CustomError extends Error {
	/**
	 * @constructor
	 * @param {String} message - error message
	 * @param {Number} statusCode - error status code
	 * @param {Number} errorCode - custom error code
	 * @param {*} details - error details
	 */
	constructor(message, statusCode, errorCode, details) {
		super(message);

		this.name = this.constructor.name;
		this.message = message;
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.details = details;

		// generate stack trace
		Error.captureStackTrace(this, CustomError);
	}
}
