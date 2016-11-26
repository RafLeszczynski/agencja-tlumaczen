import React from 'react';
import Button from '../Button/Button';
import ContactForm from '../ContactForm/ContactForm';
import PriceTable from '../PriceTable/PriceTable';
import PriceTableCar from '../PriceTableCar/PriceTableCar';
import sections from './Prizes.messages';

/**
 * @desc triggers show modal method with appropriate params
 * @param {Function} showModal - function resposible for rendering modal component
 * @param {String} modalTitle - title of modal component
 * @param {Object} props - modal component props
 * @returns {void}
 */
function showCheckPrizesModal(showModal, modalTitle) {
	showModal(modalTitle, ContactForm);
}

const prizesWrapperClassName = 'prizes';
const prizesSectionClassName = 'prizes__section';
const prizesDescriptionClassName = 'prizes__section__description';
const Prizes = ({showModal}) => {
	return (
		<div>
			<div className={prizesWrapperClassName}>
				{sections.map((section, index) => {
					return (
						<div key={index} className={prizesSectionClassName}>
							<p className={prizesDescriptionClassName}>
								{section.description}
							</p>
							<Button
								name={section.button}
								action={showCheckPrizesModal.bind(
									this, showModal, section.modalTitle
								)}
							/>
						</div>
					);
				})}
			</div>
			<h3 className='prizes table-header'>Cennik usług tłumaczeniowych</h3>
			<PriceTable/>
			<p className='prizes prizes__section__description'>Ceny brutto (PLN) za jedną stronę standardową (1600 znaków) ze spacjami.
				Tłumaczenia przysięgłe rozlicane są wg ustawowego wymiaru strony - 1125 znaków.
				Ceny tłumaczeń ustnych dotyczą jednej godziny zegarowej.</p>
			<h3 className='prizes table-header'>Cennik tłumaczeń dokumentów samochodwych</h3>
			<PriceTableCar/>
			<p className='prizes prizes__section__description'>Cennik nie stanowi oferty handlowej w rozumieniu art. 66 §1 KC.
				Ceny mogą ulec zmianie bez uprzedzenia.</p>
		</div>
	);
};

Prizes.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Prizes;
