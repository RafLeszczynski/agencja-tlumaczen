require('../scss/components/button.scss');

import React from 'react';
import classNames from 'classnames';

const Button = ({big, link, linkUrl, name, secondary, title}) => {
	let buttonClasses = classNames({
		button: true,
		'button--secondary': secondary,
		'button--big': big
	});

	return (
		link ?
			<a href={linkUrl} className={buttonClasses} target="_blank" title={title}>{name}</a> :
			<button className={buttonClasses}>{name}</button>
	);
};

Button.propTypes = {
	big: React.PropTypes.bool,
	link: React.PropTypes.bool,
	linkUrl: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	secondary: React.PropTypes.bool,
	title: React.PropTypes.string
};

export default Button;
