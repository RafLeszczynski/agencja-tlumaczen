import React from 'react';
import ReactDOM from 'react-dom';

import throttle from 'helpers/throttle';

import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import Contact from 'components/Contact';

import messages from 'messages';

export default class Application extends React.Component {
	static propTypes = {
		collapsedHeaderHeight: React.PropTypes.number.isRequired,
		scrollDuration: React.PropTypes.number.isRequired,
		throttleThreshold: React.PropTypes.number.isRequired
	};

	static defaultProps = {
		collapsedHeaderHeight: 56,
		scrollDuration: 500,
		throttleThreshold: 15
	};

	state = {
		fixedHeader: false,
		isMenuExpanded: false
	};

	_headerComponent = null;

	constructor(props) {
		super(props);
	}

	/**
	 * toggles fixed header position
	 */
	toggleHeaderPosition() {
		let componentHeight = ReactDOM.findDOMNode(this._headerComponent).offsetHeight,
				fixedOffset = componentHeight - this.props.collapsedHeaderHeight,
				shouldBeFixed = window.scrollY >= fixedOffset;

		if (this.state.fixedHeader !== shouldBeFixed) {
			this.setState({
				fixedHeader: shouldBeFixed
			});
		}
	}

	/**
	 * @desc toggles navigation menu display (for small and medium breakpoint)
	 */
	toggleMenuDisplay() {
		this.setState({
			isMenuExpanded: !this.state.isMenuExpanded
		});
	}

	/**
	 * @desc hides navigation menu (for small and medium breakpoint)
	 */
	hideMenu() {
		if (this.state.isMenuExpanded) {
			this.setState({
				isMenuExpanded: false
			});
		}
	}

	throttledToggleHeaderPosition = throttle(this.toggleHeaderPosition, this.props.throttleThreshold, this);
	throttledHideMenu = throttle(this.hideMenu, this.props.throttleThreshold, this);

	componentDidMount() {
		window.addEventListener('scroll', this.throttledToggleHeaderPosition);
		window.addEventListener('scroll', this.throttledHideMenu);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll',this.throttledToggleHeaderPosition);
		window.removeEventListener('scroll', this.throttledHideMenu);
	}

	render() {
		return (
			<div>
				<Header
					collapsedHeaderHeight={this.props.collapsedHeaderHeight}
					isMenuExpanded={this.state.isMenuExpanded}
					fixedHeader={this.state.fixedHeader}
					goToPromoSectionId='offer'
					goToPromoSectionName={messages.showOfferDetails}
					navLinks={messages.links}
					ref={(component) => this._headerComponent = component}
					subtitle={messages.pageSubtitle}
					title={messages.pageTitle}
					toggleMenu={this.toggleMenuDisplay.bind(this)}
				/>

				<Section title={messages.officeSectionHeader} id='office' flexLayout={true}>
					{messages.offices.map((address) => {
						let {...addressData} = address;
						return <OfficeAddress {...addressData} showLocation={messages.showLocation}/>;
					})}
				</Section>

				<Section title={messages.contactSectionHeader} id='contact'>
					<Contact {...messages.contactDetails} contactUs={messages.contactUs}/>
				</Section>

				<Section title={messages.offerSectionHeader} id='offer'>
					{messages.offer.map((item) => {
						return <SectionItem item={item}/>;
					})}
				</Section>

				<Section title={messages.languageSectionHeader} id='languages'
				         description={messages.languageSectionDescription}>
					<Languages languages={messages.languages} sideNote={messages.otherLanguagesDescription}/>
				</Section>

				<Section title={messages.prizesSectionHeader} id='prizes'>
					{messages.prizes.map((item) => {
						return <SectionItem item={item}/>;
					})}
				</Section>

				<Section title={messages.docsSectionHeader} id='docs' description={messages.docsSectionDescription}>
				</Section>
			</div>
		);
	}
}
