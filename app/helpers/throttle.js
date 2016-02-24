/**
 * @desc simple throttle function
 * @param {Function} fn - function to be throttled
 * @param {Number?} threshold - throttle threshold in milliseconds
 * @param {Object?} scope - context
 * @returns {Function} throttled function
 * @todo write tests and add make it more bulletproof
 */
export default (fn, threshold, scope) => {
	const defaultThreshold = 250;
	const aThreshold = threshold || defaultThreshold;
	let last,
		deferTimer;

	return () => {
		let context = scope || this,
			now = new Date(),
			args = arguments;

		if (last && now < last + aThreshold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
				fn.apply(context, args);
			}, aThreshold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
};
