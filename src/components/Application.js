import '../scss/components/modal.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Header from 'components/Header';
import Section from 'components/Section';
import Offices from 'components/Offices';
import Offer from 'components/Offer/Offer';
import Button from 'components/Button';
import Languages from 'components/Languages';
import Prizes from 'components/Prizes/Prizes';
import Contact from 'components/Contact';
import Docs from 'components/Docs';
import Modal from 'components/Modal';
import ContactForm from 'components/ContactForm/ContactForm';
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

	// set reference to throttledListeners
	_throttledToggleHeaderPosition = throttle(this._toggleHeaderPosition, this.props.throttleThreshold, this);
	_throttledHideMenu = throttle(this._hideMenu, this.props.throttleThreshold, this);

	constructor(props) {
		super(props);

		this.state = {
			fixedHeader: false,
			isMenuExpanded: false,
			isModalVisible: false,
			offsetHeight: 0,
			modalName: '',
			modalComponentName: '',
			modalComponentProps: {}
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this._throttledToggleHeaderPosition);
		window.addEventListener('scroll', this._throttledHideMenu);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._throttledToggleHeaderPosition);
		window.removeEventListener('scroll', this._throttledHideMenu);
	}

	componentDidUpdate(nextProps, nextState) {
		if (nextState.offsetHeight !== 0) {
			Application._setWindowScrollYPosition(nextState.offsetHeight);

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
				<div className={withModal} style={this._getOffsetStyles()}>
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
						toggleMenu={this._toggleMenuDisplay.bind(this)}
					/>
					{this._getSectionsData().map(Application._renderSection, this)}
				</div>
				{this.state.isModalVisible && this._renderModal(
					this.state.modalName, this.state.modalComponentName, this.state.modalComponentProps
				)}
			</div>
		);
	}

	/**
	 * @desc return section data
	 * @returns {Array}
	 * @private
	 */
	_getSectionsData() {
		return [
			{
				title: messages.officeSectionHeader,
				id: 'office',
				children: (<Offices officesData={messages.offices} showLocation={messages.showLocation}/>)
			},
			{
				title: messages.contactSectionHeader,
				id: 'contact',
				children: (<Contact
					contactUs={messages.contactUs}
					showModal={this._showModal.bind(this)}
					{...messages.contactDetails}
				/>)
			},
			{
				title: messages.offerSectionHeader,
				id: 'offer',
				children: (<Offer showModal={this._showModal.bind(this)}/>)
			},
			{
				title: messages.languageSectionHeader,
				id: 'languages',
				description: messages.languageSectionDescription,
				children: (<Languages languages={messages.languages} sideNote={messages.otherLanguagesDescription}/>)
			},
			{
				title: messages.prizesSectionHeader,
				id: 'prizes',
				children: (<Prizes showModal={this._showModal.bind(this)} />)
			},
			{
				title: messages.docsSectionHeader,
				id: 'docs',
				children: (<Docs
					tooltip={messages.docsSectionDescription}
					docs={messages.docs}
					actionTitle={messages.docsDocSelect}
				/>)
			}
		]
	}

	/**
	 * @desc renders section component
	 * @param {Object} sectionData
	 * @param {Number} index
	 * @returns {XML}
	 */
	static _renderSection(sectionData, index) {
		return (
			<Section
				key={index}
				title={sectionData.title}
				id={sectionData.id}
				description={sectionData.description}
			>
				{sectionData.children}
			</Section>
		);
	}

	/**
	 * @desc sets window scrollY position
	 * @param {Number} position
	 * @private
	 */
	static _setWindowScrollYPosition(position) {
		window.scrollTo(0, position)
	}

	/**
	 * @desc toggles fixed header position
	 * @todo simplify condition statement
	 */
	_toggleHeaderPosition() {
		let shouldBeFixed = this._shouldHeaderBeFixed(window.scrollY,
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
	_shouldHeaderBeFixed(windowScrollY, headerHeight) {
		return windowScrollY >= headerHeight - this.props.collapsedHeaderHeight;
	}

	/**
	 * @desc toggles navigation menu display (for small and medium breakpoint)
	 */
	_toggleMenuDisplay() {
		this.setState({
			isMenuExpanded: !this.state.isMenuExpanded
		});
	}

	/**
	 * @desc hides navigation menu (for small and medium breakpoint)
	 */
	_hideMenu() {
		if (this.state.isMenuExpanded) {
			this.setState({
				isMenuExpanded: false
			});
		}
	}

	/**
	 * @desc shows modal component
	 * @param {String} title - modal name
	 * @param {String} componentName
	 * @param {Object} props
	 */
	_showModal(title, componentName, props) {
		this.setState({
			isModalVisible: true,
			offsetHeight: window.scrollY,
			modalName: title,
			modalComponentName: componentName,
			modalComponentProps: props
		});

		Application._setWindowScrollYPosition(0);
	}

	/**
	 * @desc hides modal component
	 */
	_hideModal() {
		this.setState({
			isModalVisible: false,
			modalName: '',
			modalComponentName: '',
			modalComponentProps: {}
		});
	}

	/**
	 * @desc renders modal component
	 * @param {String} title
	 * @param {String} componentName
	 * @param {Object} props
	 * @returns {XML}
	 */
	_renderModal(title, componentName, props) {
		return (
			<Modal title={title} closeAction={this._hideModal.bind(this)}>
				{React.createElement(componentName, props)}
			</Modal>
		);
	}

	/**
	 * @desc sets top position styles of wrapper content
	 * @returns {{top: number|string}}
	 */
	_getOffsetStyles() {
		let offset = this.state.offsetHeight;

		return {top: offset ? -offset : 'auto'};
	}
}
