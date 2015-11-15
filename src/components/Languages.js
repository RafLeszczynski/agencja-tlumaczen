require('../scss/components/languages.scss');

import React from 'react';
import groupLanguagesByLetter from 'helpers/languageSort';
import LanguageGroup from 'components/LanguageGroup';

const Languages = ({languages, sideNote}) => {
	let groupedLanguages = groupLanguagesByLetter(languages);

	return (
			<div>
				<ul className="languages">
					{groupedLanguages.map((languageGroup, index) => {
						return <LanguageGroup key={index} languages={languageGroup}/>
					})}
				</ul>
				<p>{sideNote}</p>
			</div>
	);
};

Languages.propTypes = {
	languages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	sideNote: React.PropTypes.string.isRequired
};

export default Languages;