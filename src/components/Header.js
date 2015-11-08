require('../scss/header.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link, Element} from 'react-scroll';

import MenuButton from 'components/MenuButton';
import Navigation from 'components/Navigation';
import Hero from 'components/Hero';

export default class Header extends React.Component {
	static collapsedHeaderHeight = 56;
	static id = 'header';

	static propTypes = {
		title: React.PropTypes.string.isRequired,
		subtitle: React.PropTypes.string.isRequired,
		actionButtonName: React.PropTypes.string.isRequired,
		navLinks: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
		expendedNavHandler: React.PropTypes.func.isRequired,
	};

	state = {
		fixedHeader: false,
		isMenuExpended: false,
		scrollOffset: -142,
		scrollDuration: 500
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
			fixedOffset = componentHeight - Header.collapsedHeaderHeight,
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
		let {actionButtonName, navLinks, subtitle, title} = this.props,

		// state
			fixedHeader = this.state.fixedHeader,
			isMenuExpanded = this.state.isMenuExpended,

			headerClasses = classNames({
				header: true,
				'header--fixed': fixedHeader || isMenuExpanded,
				'header--expanded': isMenuExpanded
			});

		return (
			<div className="header-wrapper">
				<Element name={Header.id}>
					<header className={headerClasses} style={isMenuExpanded ? {height: window.innerHeight} : {}}>
						<MenuButton toggleMenu={this.toggleMenuDisplay.bind(this)} fixedHeader={fixedHeader}/>

						<div className="header__home-link">
							<Link to={Header.id} spy={true} smooth={true} offset={this.state.scrollOffset}
							      duration={this.state.scrollDuration}>{title}</Link>
						</div>

						<Navigation links={navLinks}/>
						<Hero title={title} subtitle={subtitle} actionButton={actionButtonName}/>
					</header>
				</Element>
			</div>
		);
	}
}
