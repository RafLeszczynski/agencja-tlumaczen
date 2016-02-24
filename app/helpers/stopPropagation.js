/**
 * @desc stops event propagation
 * @param {Event} event - browser event object
 * @returns {void}
 */
export default event => {
	event.stopPropagation();
};
