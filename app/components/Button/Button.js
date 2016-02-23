import 'components/Button/Button.scss';

import React from 'react';
import classNames from 'classnames';

const Button = ({action, big, link, linkUrl, name, secondary, title}) => {
	const buttonClasses = classNames({
		button: true,
		'button--secondary': secondary,
		'button--big': big
	});

	return (
		link ?
			<a href={linkUrl} className={buttonClasses} target='_blank' title={title}>{name}</a> :
			<button className={buttonClasses} onClick={action}>{name}</button>
	);
};

Button.propTypes = {
	action: React.PropTypes.func,
	big: React.PropTypes.bool,
	link: React.PropTypes.bool,
	linkUrl: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	secondary: React.PropTypes.bool,
	title: React.PropTypes.string
};

export default Button;
