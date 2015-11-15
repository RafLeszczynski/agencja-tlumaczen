/**
 * @desc groups languages by letter
 * @param {Array} languages
 * @returns {Array[]}
 * @todo add unit tests
 */
export default function groupLanguagesByLetter(languages) {
	let languagesMap = new Map(),
		groupedLanguages = [];

	languages.forEach((language) => {
		let aString = language.trim(),
			firstLetter = aString.charAt(0).toLowerCase();

		if (!languagesMap.has(firstLetter)) {
			languagesMap.set(firstLetter, [aString]);
		} else {
			languagesMap.get(firstLetter).push(aString);
		}
	});

	languagesMap.forEach((languageGroup) => {
		groupedLanguages.push(languageGroup);
	});


	return groupedLanguages;
};