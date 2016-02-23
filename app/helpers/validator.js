export const emailPattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * @desc validates email address
 * @param {String} emailAddress - email addres to be validated
 * @todo: write tests
 * @returns {Boolean} - validation result
 */
export default emailAddress => {
	return emailPattern.test(emailAddress);
};
