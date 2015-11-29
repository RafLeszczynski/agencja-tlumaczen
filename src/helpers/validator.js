const emailPattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * @desc validates email address
 * @param {String} emailAddress
 * @todo: write tests
 * @returns {Boolean}
 */
export function validateEmail(emailAddress) {
	return emailPattern.test(emailAddress);
}