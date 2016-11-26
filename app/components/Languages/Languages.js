import React from 'react';
import groupLanguagesByLetter from '../../helpers/languageSort';
import LanguageGroup from './LanguageGroup';
import * as messages from './Languages.messages';

/**
 * #desc renders language group
 * @param {Array} data - array of languages
 * @param {Number} index - array index
 * @returns {XML} -jsx markup
 */
function renderLanguageGroup(data, index) {
	return <LanguageGroup key={index} languages={data}/>;
}

export default () => {
	const groupedLanguages = groupLanguagesByLetter(messages.languages);

	return (
		<div>
			<ul className='languages'>
				{groupedLanguages.map(renderLanguageGroup)}
			</ul>
			<p>{messages.otherLanguagesDescription}</p>
		</div>
	);
};
