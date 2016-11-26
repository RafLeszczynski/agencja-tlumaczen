import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Offices from '../Offices/Offices';
import Offer from '../Offer/Offer';
import Languages from '../Languages/Languages';
import Prizes from '../Prizes/Prizes';
import Contact from '../Contact/Contact';
import Docs from '../Docs/Docs';
import Modal from '../Modal/Modal';
import throttle from '../../helpers/throttle';
import messages from './Application.messages';

/**
 * @desc Main application componenet
 */
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

	static baseOffsetHeight = 0;

	/**
	 * @desc creates new instance of the componenet and sets initial state
	 * @param {Object} props - component props
	 */
	constructor(props) {
		super(props);

		this.state = {
			fixedHeader: false,
			isMenuExpanded: false,
			isModalVisible: false,
			offsetHeight: Application.baseOffsetHeight,
			modalName: '',
			modalComponentName: '',
			modalComponentProps: {}
		};

		// reference to header component
		this._headerComponent = null;

		// set reference to throttledListeners
		this._throttledToggleHeaderPosition = throttle(this._toggleHeaderPosition, this.props.throttleThreshold, this);
	}

	/**
	 * @returns {void}
	 */
	componentDidMount() {
		window.addEventListener('scroll', this._throttledToggleHeaderPosition);
	}

	/**
	 * @returns {void}
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this._throttledToggleHeaderPosition);
	}

	/**
	 * @param {Object} nextProps - new props
	 * @param {Object} nextState - new state
	 * @returns {void}
	 */
	componentDidUpdate(nextProps, nextState) {
		if (nextState.offsetHeight !== Application.baseOffsetHeight) {
			Application._setWindowScrollYPosition(nextState.offsetHeight);

			this.setState({
				offsetHeight: Application.baseOffsetHeight
			});
		}
	}

	/**
	 * @desc renders component
	 * @returns {XML} - jsx markup
	 */
	render() {
		const withModal = classNames({
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
						ref={component => this._headerComponent = component}
						subtitle={messages.pageSubtitle}
						title={messages.pageTitle}
						toggleMenu={this._toggleMenuDisplay.bind(this)}
						hideMenu={this._hideMenu.bind(this)}
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
	 * @returns {Array} - section data
	 * @private
	 */
	_getSectionsData() {
		return [
			{
				title: messages.officeSectionHeader,
				id: 'office',
				children: <Offices/>
			},
			{
				title: messages.contactSectionHeader,
				id: 'contact',
				children: <Contact showModal={this._showModal.bind(this)}/>
			},
			{
				title: messages.offerSectionHeader,
				id: 'offer',
				children: <Offer showModal={this._showModal.bind(this)}/>
			},
			{
				title: messages.languageSectionHeader,
				id: 'languages',
				description: messages.languageSectionDescription,
				children: <Languages/>
			},
			{
				title: messages.prizesSectionHeader,
				id: 'prizes',
				children: <Prizes showModal={this._showModal.bind(this)} />
			},
			{
				title: messages.docsSectionHeader,
				id: 'docs',
				children: <Docs/>
			}
		];
	}

	/**
	 * @desc renders section component
	 * @param {Object} sectionData - props
	 * @param {Number} index - array index
	 * @returns {XML} - jsx markup
	 * @private
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
	 * @param {Number} position - current scroll horizontal position
	 * @returns {void}
	 * @private
	 */
	static _setWindowScrollYPosition(position) {
		window.scrollTo(Application.baseOffsetHeight, position);
	}

	/**
	 * @desc toggles fixed header position
	 * @returns {void}
	 * @todo simplify condition statement
	 * @private
	 */
	_toggleHeaderPosition() {
		const shouldBeFixed = this._shouldHeaderBeFixed(window.scrollY,
			ReactDOM.findDOMNode(this._headerComponent).offsetHeight);

		if (this.state.fixedHeader !== shouldBeFixed && !this.state.isModalVisible) {
			this.setState({
				fixedHeader: shouldBeFixed
			});
		}
	}

	/**
	 * @desc checks if header should be fixed base of window.scrollY and header height
	 * @param {Number} windowScrollY - scroll position
	 * @param {Number} headerHeight - height of header componenet
	 * @returns {Boolean} - decision
	 * @private
	 */
	_shouldHeaderBeFixed(windowScrollY, headerHeight) {
		return windowScrollY >= headerHeight - this.props.collapsedHeaderHeight;
	}

	/**
	 * @desc toggles navigation menu display (for small and medium breakpoint)
	 * @returns {void}
	 * @private
	 */
	_toggleMenuDisplay() {
		this.setState({
			isMenuExpanded: !this.state.isMenuExpanded
		});
	}

	/**
	 * @desc hides navigation menu (for small and medium breakpoint)
	 * @returns {void}
	 * @private
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
	 * @param {String} componentName - componenet name
	 * @param {Object} props - componenet props
	 * @returns {void}
	 * @private
	 */
	_showModal(title, componentName, props) {
		this.setState({
			isModalVisible: true,
			offsetHeight: window.scrollY,
			modalName: title,
			modalComponentName: componentName,
			modalComponentProps: props
		});

		Application._setWindowScrollYPosition(Application.baseOffsetHeight);
	}

	/**
	 * @desc hides modal component
	 * @returns {void}
	 * @private
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
	 * @param {String} title - modal title
	 * @param {String} componentName - componenet name
	 * @param {Object} props - componenet props
	 * @returns {XML} - jsx markup
	 * @private
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
	 * @returns {Object} - {top: number|string}
	 * @private
	 */
	_getOffsetStyles() {
		const offset = this.state.offsetHeight;

		return {top: offset ? -offset : 'auto'};
	}
}
