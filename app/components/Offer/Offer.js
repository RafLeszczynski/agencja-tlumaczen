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
