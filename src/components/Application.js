import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Header from 'components/Header';
import Section from 'components/Section';
import Offices from 'components/Offices';
import Offer from 'components/Offer';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import Contact from 'components/Contact';
import Docs from 'components/Docs';
import Modal from 'components/Modal';
import ContactForm from 'components/ContactForm';
import OfferDetails from 'components/OfferDetails';
import throttle from 'helpers/throttle';
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

	// reference to header component
	_headerComponent = null;

	state = {
		fixedHeader: false,
		isMenuExpanded: false,
		isModalVisible: false,
		offsetHeight: 0,
		modalName: ''
	};

	static setWindowScrollYPosition(position) {
		window.scrollTo(0, position)
	}

	/**
	 * @desc toggles fixed header position
	 * @todo simplify condition statement
	 */
	toggleHeaderPosition() {
		let shouldBeFixed = this.shouldHeaderBeFixed(window.scrollY,
			ReactDOM.findDOMNode(this._headerComponent).offsetHeight);

		if (this.state.fixedHeader !== shouldBeFixed && !this.state.isModalVisible) {
			this.setState({
				fixedHeader: shouldBeFixed
			});
		}
	}

	/**
	 * @desc checks if header should be fixed base of window.scrollY and header height
	 * @param {Number} windowScrollY
	 * @param {Number} headerHeight
	 * @returns {Boolean}
	 */
	shouldHeaderBeFixed(windowScrollY, headerHeight) {
		return windowScrollY >= headerHeight - this.props.collapsedHeaderHeight;
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

	/**
	 * @desc shows modal component
	 * @param {String} name - modal name
	 */
	showModal(name) {
		this.setState({
			isModalVisible: true,
			offsetHeight: window.scrollY,
			modalName: name
		});

		Application.setWindowScrollYPosition(0);
	}

	/**
	 * @desc hides modal component
	 */
	hideModal() {
		this.setState({
			isModalVisible: false,
			modalName: ''
		});
	}

	/**
	 * @desc renders modal component
	 * @returns {XML}
	 */
	renderModal() {
		let title = this.state.modalName;

		return (
			<Modal title={title} closeAction={this.hideModal.bind(this)}>
				{this.renderModalContent(title)}
			</Modal>
		);
	}

	/**
	 * @deac renders modal content based on its name
	 * @param {String} name
	 * @returns {XML}
	 */
	renderModalContent(name) {
		console.log(name);

		switch (name) {
			case 'contact':
				return <ContactForm/>;
				break;
			default:
				return <OfferDetails details={messages.offerDetails[name]}/>
		}
	}

	/**
	 * @desc renders section component
	 * @param {String} title
	 * @param {String} id
	 * @param {XML} children
	 * @returns {XML}
	 */
	renderSection(title, id, children) {
		return (
			<Section title={title} id={id}>
				{children}
			</Section>
		);
	}

	/**
	 * @desc sets top position styles of wrapper content
	 * @returns {{top: number|string}}
	 */
	getOffsetStyles() {
		let offset = this.state.offsetHeight;

		return {top: offset ? -offset : 'auto'};
	}

	// set reference to throttledListeners
	throttledToggleHeaderPosition = throttle(this.toggleHeaderPosition, this.props.throttleThreshold, this);
	throttledHideMenu = throttle(this.hideMenu, this.props.throttleThreshold, this);

	componentDidMount() {
		window.addEventListener('scroll', this.throttledToggleHeaderPosition);
		window.addEventListener('scroll', this.throttledHideMenu);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.throttledToggleHeaderPosition);
		window.removeEventListener('scroll', this.throttledHideMenu);
	}

	componentDidUpdate(nextProps, nextState) {
		if (nextState.offsetHeight !== 0) {
			Application.setWindowScrollYPosition(nextState.offsetHeight);

			this.setState({
				offsetHeight: 0
			});
		}
	}

	render() {
		let withModal = classNames({
				'with-modal': this.state.isModalVisible
			});

		return (
			<div>
				<div className={withModal} style={this.getOffsetStyles()}>
					<Header collapsedHeaderHeight={this.props.collapsedHeaderHeight}
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

					{this.renderSection(
						messages.officeSectionHeader,
						'office',
						(<Offices officesData={messages.offices} showLocation={messages.showLocation}/>)
					)}

					<Section title={messages.contactSectionHeader} id='contact'>
						<Contact contactUs={messages.contactUs}
						         showModal={this.showModal.bind(this)} {...messages.contactDetails}/>
					</Section>

					<Section title={messages.offerSectionHeader} id='offer'>
						<Offer offer={messages.offer} showModal={this.showModal.bind(this)}/>
					</Section>

					<Section title={messages.languageSectionHeader} id='languages'
					         description={messages.languageSectionDescription}>
						<Languages languages={messages.languages} sideNote={messages.otherLanguagesDescription}/>
					</Section>

					<Section title={messages.prizesSectionHeader} id='prizes'>
						{messages.prizes.map((item, index) => {
							return <SectionItem key={index} item={item}/>;
						})}
					</Section>

					<Section title={messages.docsSectionHeader} id='docs'>
						<Docs tooltip={messages.docsSectionDescription}
						      docs={messages.docs}
						      actionTitle={messages.docsDocSelect}/>
					</Section>
				</div>
				{this.state.isModalVisible && this.renderModal()}
			</div>
		);
	}
}
