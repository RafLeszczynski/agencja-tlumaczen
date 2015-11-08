import React from 'react';
import {Link} from 'react-scroll';

export default class Navigation extends React.Component {
	static propTypes = {
		links: React.PropTypes.array.isRequired,
		scrollOffset: React.PropTypes.number.isRequired,
		scrollDuration: React.PropTypes.number.isRequired
	};

	render() {
		let {links, scrollDuration, scrollOffset} = this.props;

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
	}
}
