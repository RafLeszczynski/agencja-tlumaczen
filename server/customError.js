/**
 * custom error object
 */
export default class CustomError extends Error {
	/**
	 * @constructor
	 * @param {String} message
	 * @param {Number} statusCode
	 * @param {Number} errorCode
	 * @param {*} details
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
