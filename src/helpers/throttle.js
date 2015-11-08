/**
 * @desc simple throttle function
 * @param {Function} fn
 * @param {Number?} threshold
 * @param {Object?} scope
 * @returns {Function}
 * @todo write tests and add make it more bulletproof
 */
export default function throttle(fn, threshold, scope) {
	threshold || (threshold = 250);

	let last,
		deferTimer;

	return function () {
		let context = scope || this,
			now = new Date(),
			args = arguments;

		if (last && now < last + threshold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}
