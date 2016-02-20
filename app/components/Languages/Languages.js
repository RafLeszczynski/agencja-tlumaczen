import 'components/Languages/Languages.scss';
import React from 'react';
import groupLanguagesByLetter from 'helpers/languageSort';
import LanguageGroup from 'components/Languages/LanguageGroup';
import * as messages from 'components/Languages/Languages.messages';

const Languages = () => {
	const groupedLanguages = groupLanguagesByLetter(messages.languages);

	return (
		<div>
			<ul className="languages">
				{groupedLanguages.map(renderLanguageGroup)}
			</ul>
			<p>{messages.otherLanguagesDescription}</p>
		</div>
	);
};

/**
 * #desc renders language group
 * @param {Array} data
 * @param {Number} index
 * @returns {XML}
 */
function renderLanguageGroup(data, index) {
	return <LanguageGroup key={index} languages={data}/>
}

export default Languages;