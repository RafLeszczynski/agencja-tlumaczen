import 'components/Offer/Offer.scss';
import React from 'react';
import Button from 'components/Button/Button';
import OfferDetails from 'components/OfferDetails/OfferDetails';
import messages from 'components/Offer/Offer.messages';

/**
 * Offer react component
 */
export default class Offer extends React.Component {
	static propTypes = {
		showModal: React.PropTypes.func.isRequired
	};

	/**
	 * @desc triggers modal opening on click
	 * @param {String} title - modal title
	 * @param {Array} details - offer details content
	 * @returns {void}
	 */
	clickHandler(title, details) {
		const props = {details: details};

		this.props.showModal(title, OfferDetails, props);
	}

	/**
	 * @desc renders offer section
	 * @param {Object} section - react props
	 * @param {Number} index - array index
	 * @returns {XML} -jsx markup
	 */
	renderOfferSection(section, index) {
		return (
			<article className='offer__item' key={index}>
				{Offer.renderOfferSectionIcon(index)}
				<h3>{section.title}</h3>
				<p>{section.description}</p>
				{section.details.map(this.renderOfferDetailsButtons, this)}
			</article>
		);
	}

	/**
	 * @desc renders offer details button
	 * @param {Object} detail - react props
	 * @param {Number} index - array index
	 * @returns {XML} - jsx markup
	 */
	renderOfferDetailsButtons(detail, index) {
		return (
			<Button
				key={index}
				name={detail.title}
				action={this.clickHandler.bind(this, detail.title, detail.content)}
			/>
		);
	}

	/**
	 * @desc renders svg icon for offer section
	 * @param {Number} index - section index
	 * @todo: make this more reusable
	 * @returns {XML} - jsx markup
	 */
	static renderOfferSectionIcon(index) {
		return index === 0 ?
			<svg id="penIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
				<path class="cls-1" d="M111.91,210.5h-0.17a1,1,0,0,1-.81-1V120.29a1,1,0,0,1,.07-0.38l2.39-5.9-4.08-4.21a1,1,0,0,1,0-1.4,1,1,0,0,1,1.38,0l4.54,4.67a1,1,0,0,1,.21,1.07l-2.56,6.32v83.23l31.15-90L128,23.64a1,1,0,0,1,.78-1.15,1,1,0,0,1,1.13.8L146,113.61a1,1,0,0,1,0,.51l-33.12,95.73A1,1,0,0,1,111.91,210.5Z"/>
				<path class="cls-1" d="M108.1,210.5a1,1,0,0,1-.92-0.66L74.06,114.11a1,1,0,0,1,0-.51L86.59,43a1,1,0,0,1,1.13-.8,1,1,0,0,1,.78,1.15L76,113.7l31.15,90V120.49l-2.56-6.32a1,1,0,0,1,.21-1.07l4.54-4.67a1,1,0,0,1,1.38,0,1,1,0,0,1,0,1.4L106.61,114l2.39,5.9a1,1,0,0,1,.07.38v89.22a1,1,0,0,1-.81,1H108.1Z"/>
				<path class="cls-1" d="M137.41,16.46H100.48a1,1,0,0,1,0-2h36.93A1,1,0,0,1,137.41,16.46Z"/>
				<path class="cls-1" d="M137.5,11.48H82.73a1,1,0,0,1,0-2H137.5A1,1,0,0,1,137.5,11.48Z"/>
			</svg> :
			<svg id="dialogIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
				<path class="cls-1" d="M95.77,141a1,1,0,0,1-.71-1.68l22.49-22.72H21.22a1,1,0,1,1,0-2h98.7a1,1,0,0,1,.7,1.68l-20.09,20.3,19.23-9.33a1,1,0,1,1,.87,1.77L96.2,140.89A1,1,0,0,1,95.77,141Z"/>
				<path class="cls-1" d="M176.43,116.59H157.6a1,1,0,1,1,0-2h17.84V39h-165V82.26a1,1,0,0,1-2,0V38a1,1,0,0,1,1-1H176.43a1,1,0,0,1,1,1V115.6A1,1,0,0,1,176.43,116.59Z"/>
				<path class="cls-1" d="M210.51,156.6H157.6a1,1,0,1,1,0-2h52.91A1,1,0,1,1,210.51,156.6Z"/>
				<path class="cls-1" d="M210.51,156.6a1,1,0,0,1-1-1V79h-165v75.64H120.2a1,1,0,1,1,0,2H43.57a1,1,0,0,1-1-1V78a1,1,0,0,1,1-1H210.51a1,1,0,0,1,1,1v77.61A1,1,0,0,1,210.51,156.6Z"/>
				<path class="cls-1" d="M182,181a1,1,0,0,1-.43-0.1L157.16,169a1,1,0,1,1,.87-1.77l19.23,9.33-20.09-20.3a1,1,0,0,1,1.41-1.39l24.15,24.4A1,1,0,0,1,182,181Z"/>
			</svg>;
	}

	/**
	 * @desc renders component
	 * @returns {XML} - jsx markup
	 */
	render() {
		return (
			<div className='offer'>
				{messages.map(this.renderOfferSection, this)}
			</div>
		);
	}
}
