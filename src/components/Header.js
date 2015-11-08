require('../scss/components/header.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link, Element} from 'react-scroll';

import HamburgerIcon from 'components/HamburgerIcon';
import Navigation from 'components/Navigation';
import Hero from 'components/Hero';

export default class Header extends React.Component {
	static propTypes = {
		actionButtonName: React.PropTypes.string.isRequired,
		collapsedHeaderHeight: React.PropTypes.number.isRequired,
		id: React.PropTypes.string.isRequired,
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
		let {actionButtonName, collapsedHeaderHeight, id, navLinks, scrollDuration, subtitle, title} = this.props,

			fixedHeader = this.state.fixedHeader,
			isMenuExpanded = this.state.isMenuExpended,

			headerClasses = classNames({
				header: true,
				'header--fixed': fixedHeader || isMenuExpanded,
				'header--expanded': isMenuExpanded
			});

		return (
			<div className="header-wrapper">
				<Element name={id}>
					<header className={headerClasses} style={isMenuExpanded ? {height: window.innerHeight} : {}}>
						<HamburgerIcon toggleMenu={this.toggleMenuDisplay.bind(this)}/>
						<Link to={id} spy={true} smooth={true} offset={-collapsedHeaderHeight}
						      duration={scrollDuration} className="header__home-link">{title}</Link>
						<Navigation links={navLinks} scrollOffset={-collapsedHeaderHeight}
						            scrollDuration={scrollDuration}/>
						<Hero title={title} subtitle={subtitle} actionButton={actionButtonName}/>
					</header>
				</Element>
			</div>
		);
	}
}
