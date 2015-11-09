require('../scss/components/section.scss');

import React from 'react';
import {Element} from 'react-scroll';

const Section = ({id, title, description, children}) => {
	return (
			<Element name={id} className='section'>
				<h2 className='section__header'>
					<span className='section__header__title'>{title}</span>
				</h2>
				{description ? <p className='section__description'>{description}</p> : ''}
<<<<<<< Updated upstream
				<div className={sectionContentClasses}>{this.props.children}</div>
=======
				{children}
>>>>>>> Stashed changes
			</Element>
	);
};

Section.propTypes = {
	id: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	description: React.PropTypes.string
};

export default Section;
