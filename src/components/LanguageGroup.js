import React from 'react';

const LanguageGroup = ({languages}) => {
	let indexLetter = languages[0].charAt(0);

	return (
			<li className="languages__group">
				<div className="languages__group__letter">{indexLetter}</div>
				<div>
					{languages.map((language, index) => {
						return <span key={index}>{language}</span>
					})}
				</div>
			</li>
	);
};

LanguageGroup.propTypes = {
	languages: React.PropTypes.array.isRequired,
	alignment: React.PropTypes.string
};

export default LanguageGroup;
