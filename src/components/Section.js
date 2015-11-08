require('../scss/components/section.scss');

import React from 'react';
import classNames from 'classnames';
import {Element} from 'react-scroll';

export default class Section extends React.Component {
	static propTypes = {
		id: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string
	};

	render() {
		let {id, title, description, flexLayout} = this.props,
			// TODO: think about better solution for positions content children side by side
			sectionContentClasses = classNames({
				'section__content--flex': flexLayout
			});

		return (
			<Element name={id} className='section'>
				<h2 className='section__header'>
					<span className='section__header__title'>{title}</span>
				</h2>
				{description ? <p className='section__description'>{description}</p> : ''}
				<div className={sectionContentClasses}>{this.props.children}</div>
			</Element>
		);
	}
}
