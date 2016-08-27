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
			<svg id='penIcon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'>
				<path d='M111.91,210.5h-0.17a1,1,0,0,1-.81-1V120.29a1,1,0,0,1,.07-0.38l2.39-5.9-4.08-4.21a1,1,0,0,1,0-1.4,1,1,0,0,1,1.38,0l4.54,4.67a1,1,0,0,1,.21,1.07l-2.56,6.32v83.23l31.15-90L128,23.64a1,1,0,0,1,.78-1.15,1,1,0,0,1,1.13.8L146,113.61a1,1,0,0,1,0,.51l-33.12,95.73A1,1,0,0,1,111.91,210.5Z'/>
				<path d='M108.1,210.5a1,1,0,0,1-.92-0.66L74.06,114.11a1,1,0,0,1,0-.51L86.59,43a1,1,0,0,1,1.13-.8,1,1,0,0,1,.78,1.15L76,113.7l31.15,90V120.49l-2.56-6.32a1,1,0,0,1,.21-1.07l4.54-4.67a1,1,0,0,1,1.38,0,1,1,0,0,1,0,1.4L106.61,114l2.39,5.9a1,1,0,0,1,.07.38v89.22a1,1,0,0,1-.81,1H108.1Z'/>
				<path d='M137.41,16.46H100.48a1,1,0,0,1,0-2h36.93A1,1,0,0,1,137.41,16.46Z'/>
				<path d='M137.5,11.48H82.73a1,1,0,0,1,0-2H137.5A1,1,0,0,1,137.5,11.48Z'/>
			</svg> :
			<svg id='dialogIcon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'>
				<path d='M95.77,141a1,1,0,0,1-.71-1.68l22.49-22.72H21.22a1,1,0,1,1,0-2h98.7a1,1,0,0,1,.7,1.68l-20.09,20.3,19.23-9.33a1,1,0,1,1,.87,1.77L96.2,140.89A1,1,0,0,1,95.77,141Z'/>
				<path d='M176.43,116.59H157.6a1,1,0,1,1,0-2h17.84V39h-165V82.26a1,1,0,0,1-2,0V38a1,1,0,0,1,1-1H176.43a1,1,0,0,1,1,1V115.6A1,1,0,0,1,176.43,116.59Z'/>
				<path d='M210.51,156.6H157.6a1,1,0,1,1,0-2h52.91A1,1,0,1,1,210.51,156.6Z'/>
				<path d='M210.51,156.6a1,1,0,0,1-1-1V79h-165v75.64H120.2a1,1,0,1,1,0,2H43.57a1,1,0,0,1-1-1V78a1,1,0,0,1,1-1H210.51a1,1,0,0,1,1,1v77.61A1,1,0,0,1,210.51,156.6Z'/>
				<path d='M182,181a1,1,0,0,1-.43-0.1L157.16,169a1,1,0,1,1,.87-1.77l19.23,9.33-20.09-20.3a1,1,0,0,1,1.41-1.39l24.15,24.4A1,1,0,0,1,182,181Z'/>
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
				<article className='offer__item'>
					<svg id="ackU"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
						<path d="M174,169.9a1,1,0,0,1-1-1V30.7L154.16,11.48h-107l0.25,38.61a1,1,0,0,1-1,1,1,1,0,0,1-1-1L45.21,10.5a1,1,0,0,1,.29-0.7,1,1,0,0,1,.7-0.29H154.57a1,1,0,0,1,.7.29l19.44,19.8a1,1,0,0,1,.28.7V168.91A1,1,0,0,1,174,169.9Z"/>
						<path d="M173.49,210.5H46a1,1,0,0,1-1-1L45,89.7a1,1,0,1,1,2,0l0,118.82h126.5A1,1,0,0,1,173.49,210.5Z"/>
						<path d="M163.7,144.16H56a1,1,0,0,1,0-2H163.7A1,1,0,0,1,163.7,144.16Z"/>
						<path d="M75.87,59.61H69.58L68.09,64H65.78l6-16.89h1.94L79.64,64H77.34Zm-5.63-1.91h5l-2.43-7.25H72.73Z"/>
						<path d="M90.53,56.32H89.06V64H86.8V47.06h2.26v7.47H90.3l6.2-7.47H99l0,0.06-6.77,8,7.25,8.78,0,0.06H96.78Z"/>
						<path d="M118,58.55l0,0.07a5.1,5.1,0,0,1-1.65,4,6.27,6.27,0,0,1-4.49,1.6,5.86,5.86,0,0,1-4.62-2A7.52,7.52,0,0,1,105.49,57V54a7.54,7.54,0,0,1,1.78-5.16,5.86,5.86,0,0,1,4.62-2,6.44,6.44,0,0,1,4.51,1.53,5.07,5.07,0,0,1,1.63,4l0,0.07h-2.17a3.79,3.79,0,0,0-1-2.81,3.94,3.94,0,0,0-2.91-1,3.55,3.55,0,0,0-3,1.54A6.33,6.33,0,0,0,107.75,54v3a6.37,6.37,0,0,0,1.12,3.85,3.55,3.55,0,0,0,3,1.54,4,4,0,0,0,2.91-1,3.82,3.82,0,0,0,1-2.84H118Z"/>
						<path d="M132.4,57.72h-6.77V55.93h6.77v1.79Z"/>
						<path d="M153.29,47.06V58.28a5.48,5.48,0,0,1-1.79,4.35,6.75,6.75,0,0,1-4.61,1.57,6.37,6.37,0,0,1-4.45-1.57,5.57,5.57,0,0,1-1.73-4.35V47.06H143V58.28a4.1,4.1,0,0,0,1.1,3,3.83,3.83,0,0,0,2.83,1.1,4.16,4.16,0,0,0,3-1.1,4,4,0,0,0,1.15-3V47.06h2.26Z"/>
						<path d="M163.7,197.63H124.54a1,1,0,0,1,0-2H163.7A1,1,0,0,1,163.7,197.63Z"/>
						<path d="M163.7,131.29H56a1,1,0,0,1,0-2H163.7A1,1,0,0,1,163.7,131.29Z"/>
						<path d="M163.7,102.57H56a1,1,0,0,1,0-2H163.7A1,1,0,0,1,163.7,102.57Z"/>
					</svg>
					<h3>Wypełnianie deklaracji
						AKC-U</h3>
					<h4>Sporządzenie deklaracji i pobranie potwierdzenia</h4>
					<p className="akc-u">Deklaracja wypełniana jest przez pracownika na miejscu lub w ciągu jednego dnia roboczego. Otrzymują Państwo sporządzoną deklarację i samodzielnie opłacają akcyzę. </p>
					<p className="akc-u">Koszt usługi: 25PLN</p>
					<h4>Sporządzenie deklaracji wraz ze złożeniem UPL (upoważnienia),<br/> opłaceniem i pobraniem potwierdzenia</h4>
					<p className="akc-u">Usługa bardziej kompleksowa. Przy pierwszej deklaracji składanej dla Państwa, czas realizacji to ok. 7 dni ze względu na konieczność zarejestrowania UPL w US. Przy kolejnych deklaracjach dla tego samego klienta, czas oczekiwania skraca się do jednego dnia roboczego (przy złożeniu dokumentów do godziny 10:00).</p>
					<p className="akc-u">Koszt usługi: od 60PLN + zwrot kosztów akcyzy pokrytych uprzednio przez biuro</p>
				</article>
			</div>
		);
	}
}
