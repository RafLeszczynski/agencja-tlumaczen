import React from 'react';

const LanguageGroup = ({languages}) => {
	const indexLetter = languages[0].charAt(0);

	return (
		<li className="languages__group">
			<div className="languages__group__letter">{indexLetter}</div>
			<div>
				{languages.map(renderLanguageItem)}
			</div>
		</li>
	);
};

/**
 * @desc renders language item
 * @param {String} language
 * @param {Number} index
 * @returns {XML}
 */
function renderLanguageItem(language, index) {
	return <span key={index}>{language}</span>
}

LanguageGroup.propTypes = {
	languages: React.PropTypes.array.isRequired,
	alignment: React.PropTypes.string
};

export default LanguageGroup;
