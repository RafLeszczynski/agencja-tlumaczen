require('../scss/components/hamburgerIcon.scss');

import React from 'react';
import classNames from 'classnames';

export default class MenuButton extends React.Component {
	static propTypes = {
		isMenuExpanded: React.PropTypes.bool,
		toggleMenu: React.PropTypes.func.isRequired
	};

	render() {
		let {isMenuExpanded, toggleMenu} = this.props,
			buttonClasses = classNames({
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
	}
}
