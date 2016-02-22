import React from 'react';

/**
 * @desc renders language item
 * @param {String} language - language
 * @param {Number} index - array index
 * @returns {XML} - jsx markup
 */
function renderLanguageItem(language, index) {
	return <span key={index}>{language}</span>;
}

const LanguageGroup = ({languages}) => {
	const zeroIndex = 0;
	const indexLetter = languages[zeroIndex].charAt(zeroIndex);

	return (
		<li className='languages__group'>
			<div className='languages__group__letter'>{indexLetter}</div>
			<div>
				{languages.map(renderLanguageItem)}
			</div>
		</li>
	);
};

LanguageGroup.propTypes = {
	languages: React.PropTypes.array.isRequired,
	alignment: React.PropTypes.string
};

export default LanguageGroup;
