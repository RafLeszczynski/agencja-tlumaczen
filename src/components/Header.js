require('../scss/components/header.scss');
require('../scss/components/button.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link, Element} from 'react-scroll';

import HamburgerIcon from 'components/HamburgerIcon';
import Navigation from 'components/Navigation';

export default class Header extends React.Component {
	static propTypes = {
		collapsedHeaderHeight: React.PropTypes.number.isRequired,
		id: React.PropTypes.string.isRequired,
		goToPromoSectionId: React.PropTypes.string.isRequired,
		goToPromoSectionName: React.PropTypes.string.isRequired,
		navLinks: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
		scrollDuration: React.PropTypes.number.isRequired,
		subtitle: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired
	};

	static defaultProps = {
		id: 'header',
		collapsedHeaderHeight: 56,
		scrollDuration: 500
	};

	state = {
		fixedHeader: false,
		isMenuExpended: false
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// TODO: add throttle to the event listener
		window.addEventListener('scroll', this.toggleHeaderPosition.bind(this));
		// TODO: move this to separate method
		window.addEventListener('scroll', function () {
			if (this.state.isMenuExpended) {
				this.setState({
					isMenuExpended: false
				});
			}
		}.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.toggleHeaderPosition.bind(this));
	}

	/**
	 * toggles fixed header position
	 */
	toggleHeaderPosition() {
		let componentHeight = ReactDOM.findDOMNode(this).offsetHeight,
			fixedOffset = componentHeight - this.props.collapsedHeaderHeight,
			shouldBeFixed = window.scrollY >= fixedOffset;

		if (this.state.fixedHeader !== shouldBeFixed) {
			this.setState({
				fixedHeader: shouldBeFixed
			});
		}
	}

	/**
	 * toggles navigation menu display (for small and medium breakpoint)
	 */
	toggleMenuDisplay(event) {
		event.preventDefault();

		this.setState({
			isMenuExpended: !this.state.isMenuExpended
		});
	}

	render() {
		let {collapsedHeaderHeight, id, goToPromoSectionId, goToPromoSectionName, navLinks, scrollDuration, subtitle,
				title} = this.props,

			fixedHeader = this.state.fixedHeader,
			isMenuExpanded = this.state.isMenuExpended,

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
			<div className="header-wrapper">
				<Element name={id}>
					<header className={headerClasses} style={isMenuExpanded ? {height: window.innerHeight} : {}}>
						<HamburgerIcon toggleMenu={this.toggleMenuDisplay.bind(this)}/>
						<div className='header__home-link'>
							<Link to={id} spy={true} smooth={true} offset={-collapsedHeaderHeight}
							      duration={scrollDuration}>{title}</Link>
						</div>
						<Navigation links={navLinks} scrollOffset={-collapsedHeaderHeight}
						            scrollDuration={scrollDuration}/>
						<div className='header__hero'>
							<hgroup>
								<h1 className='header__hero__title'>{title}</h1>
								<h2 className='header__hero__sub-title'>{subtitle}</h2>
							</hgroup>
							<Link to={goToPromoSectionId} spy={true} smooth={true} offset={-collapsedHeaderHeight}
							      duration={scrollDuration} className={buttonClasses}>{goToPromoSectionName}</Link>
							<svg className='see-more-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
								<path d="M0 0h24v24H0z" fill="none"/>
							</svg>
						</div>
					</header>
				</Element>
			</div>
		);
	}
}
