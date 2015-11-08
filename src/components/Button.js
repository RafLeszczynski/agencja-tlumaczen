require('../scss/components/button.scss');

import React from 'react';
import classNames from 'classnames';
import theme from 'theme';

export default class Button extends React.Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		secondary: React.PropTypes.bool,
		big: React.PropTypes.bool
	};

	render() {
		let {name, secondary, big} = this.props,

		buttonClasses = classNames({
			button: true,
			'button--secondary': secondary,
			'button--big': big
		});

		return (
			<button className={buttonClasses}>{name}</button>
		);
	}
}
