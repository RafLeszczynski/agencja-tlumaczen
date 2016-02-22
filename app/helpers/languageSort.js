/**
 * @desc groups languages by letter
 * @param {Array} languages -  flat array of languages
 * @returns {Array[]} - matrix of languages grouped by letter
 * @todo add unit tests
 */
export default languages => {
	const languagesMap = new Map();
	const groupedLanguages = [];

	languages.forEach(language => {
		const firstLetterIndex = 0;
		const aString = language.trim();
		const firstLetter = aString.charAt(firstLetterIndex).toLowerCase();

		if (languagesMap.has(firstLetter)) {
			languagesMap.get(firstLetter).push(aString);
		} else {
			languagesMap.set(firstLetter, [aString]);
		}
	});

	languagesMap.forEach(languageGroup => {
		groupedLanguages.push(languageGroup);
	});

	return groupedLanguages;
};
