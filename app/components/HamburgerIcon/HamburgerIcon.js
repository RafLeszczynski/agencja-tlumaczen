import React from 'react';
import classNames from 'classnames';

const HamburgerIcon = ({isMenuExpanded, toggleMenu}) => {
	const buttonClasses = classNames({
		'menu-button': true,
		'menu-button--active': isMenuExpanded
	});

	return (
		<div className={buttonClasses} onClick={toggleMenu}>
			<span/>
			<span/>
			<span/>
			<span/>
		</div>
	);
};

HamburgerIcon.propTypes = {
	isMenuExpanded: React.PropTypes.bool,
	toggleMenu: React.PropTypes.func.isRequired
};

export default HamburgerIcon;
