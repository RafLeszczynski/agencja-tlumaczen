/**
 * @desc trims whitespace from begining of the string
 * @param {String} string
 * @returns {String}
 * @todo: add tests
 */
export default function trimFromStart(string) {
	return string.replace(/^\s+/g,'');
}