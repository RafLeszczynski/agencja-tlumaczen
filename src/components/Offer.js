require('../scss/components/offer.scss');
require('../scss/components/modal.scss');

import React from 'react';
import Button from 'components/Button';

export default class Offer extends React.Component {
	static propTypes = {
		offer: React.PropTypes.arrayOf(
			React.PropTypes.objectOf({
				title: React.PropTypes.string.isRequired,
				description: React.PropTypes.string.isRequired,
				details: React.PropTypes.array.isRequired
			})
		),
		showModal: React.PropTypes.func.isRequired
	};

	/**
	 * @desc triggers modal opening on click
	 * @param {String} title - modal title
	 */
	clickHandler(title) {
		this.props._showModal(title)
	}

	/**
	 * @desc renders offer section
	 * @param {Object} section
	 * @param {Number} index
	 * @returns {XML}
	 */
	renderOfferSection(section, index) {
		return (
			<article className="offer__item" key={index}>
				<h3>{section.title}</h3>
				<p>{section.description}</p>
				{section.details.map(this.renderOfferDetailsButtons.bind(this))}
			</article>
		);
	}

	/**
	 * @desc renders offer details button
	 * @param {Object} detail
	 * @param {Number} index
	 * @returns {XML}
	 */
	renderOfferDetailsButtons(detail, index) {
		return <Button key={index} name={detail.title} action={this.clickHandler.bind(this, detail.title)} />
	}

	render() {
		let {offer} = this.props;

		return (
			<div className="offer">
				{offer.map(this.renderOfferSection.bind(this))}
			</div>
		);
	}
}
