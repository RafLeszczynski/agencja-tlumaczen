import React from 'react';

import Button from 'components/Button'

export default class Hero extends React.Component {
	static propTypes = {
		actionButton: React.PropTypes.string.isRequired,
		subtitle: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired
	};

	render() {
		let {actionButton, subtitle, title} = this.props;

		return (
			<div className='header__hero'>
				<hgroup>
					<h1 className='header__hero__title'>{title}</h1>
					<h2 className='header__hero__sub-title'>{subtitle}</h2>
				</hgroup>
				<Button name={actionButton} altColor={true} big={true}/>
			</div>
		);
	}
}
