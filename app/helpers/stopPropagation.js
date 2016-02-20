/**
 * @desc stops event propagation
 * @param {Event} event
 */
const stopEventPropagation = (event) => {
	event.stopPropagation();
};

export default stopEventPropagation;