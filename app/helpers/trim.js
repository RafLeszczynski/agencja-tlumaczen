/**
 * @desc trims whitespace from beginning of the string
 * @param {String} string - string with potential white space
 * @returns {String} - trimmed string
 * @todo: add tests
 */
export default string => {
	return string.replace(/^\s+/g, '');
};
