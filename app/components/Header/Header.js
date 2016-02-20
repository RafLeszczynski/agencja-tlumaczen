import 'components/Header/Header.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link, Element} from 'react-scroll';
import HamburgerIcon from 'components/HamburgerIcon/HamburgerIcon';
import Navigation from 'components/Navigation/Navigation';

export default class Header extends React.Component {
	static propTypes = {
		collapsedHeaderHeight: React.PropTypes.number.isRequired,
		id: React.PropTypes.string.isRequired,
		fixedHeader: React.PropTypes.bool.isRequired,
		isMenuExpanded: React.PropTypes.bool.isRequired,
		goToPromoSectionId: React.PropTypes.string.isRequired,
		goToPromoSectionName: React.PropTypes.string.isRequired,
		navLinks: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
		scrollDuration: React.PropTypes.number.isRequired,
		subtitle: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		toggleMenu: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		id: 'header',
		scrollDuration: 500
	};

	render() {
		const {collapsedHeaderHeight, id, fixedHeader, isMenuExpanded, goToPromoSectionId, goToPromoSectionName, navLinks,
				scrollDuration, subtitle, title, toggleMenu} = this.props,

			headerClasses = classNames({
				header: true,
				'header--fixed': fixedHeader || isMenuExpanded,
				'header--expanded': isMenuExpanded
			}),
			buttonClasses = classNames({
				button: true,
				'button--secondary': true,
				'button--big': true
			});

		return (
			<Element name={id} className='header-wrapper'>
				<header className={headerClasses} style={isMenuExpanded ? {height: window.innerHeight} : {}}>
					<HamburgerIcon toggleMenu={toggleMenu} isMenuExpanded={isMenuExpanded}/>
					<div className='header__home-link'>
						<Link
							to={id}
							spy={true}
							smooth={true}
							offset={-collapsedHeaderHeight}
							duration={scrollDuration}
						>
							{title}
						</Link>
					</div>
					<Navigation
						links={navLinks}
						scrollOffset={-collapsedHeaderHeight}
						scrollDuration={scrollDuration}
					/>
					<div className='header__hero'>
						<hgroup>
							<h1 className='header__hero__title'>{title}</h1>
							<h2 className='header__hero__sub-title'>{subtitle}</h2>
						</hgroup>
						<Link
							to={goToPromoSectionId}
							spy={true}
							smooth={true}
							offset={-collapsedHeaderHeight}
							duration={scrollDuration}
							className={buttonClasses}>{goToPromoSectionName}
						</Link>
						<svg className='see-more-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</div>
				</header>
			</Element>
		);
	}
}
