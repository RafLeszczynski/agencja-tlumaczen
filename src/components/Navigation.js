require('../scss/components/navigation.scss');

import React from 'react';
import {Link} from 'react-scroll';

const Navigation = ({links, scrollDuration, scrollOffset}) => {
	return (
		<nav className='header__navigation'>
			<ul className='header__navigation-list'>
				{links.map((link) => {
					return (
						<li key={link.id} className='header__navigation-list__list-item'>
							<Link to={link.id} spy={true} smooth={true} offset={scrollOffset}
							      duration={scrollDuration}>{link.title}</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	);
};

Navigation.propTypes = {
	links: React.PropTypes.array.isRequired,
	scrollOffset: React.PropTypes.number.isRequired,
	scrollDuration: React.PropTypes.number.isRequired
};

export default Navigation;
