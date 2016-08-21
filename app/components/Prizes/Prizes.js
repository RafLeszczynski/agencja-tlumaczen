import 'components/Prizes/Prizes.scss';
import React from 'react';
import Button from 'components/Button/Button';
import CheckPrizeForm from 'components/CheckPrizeForm/CheckPrizeForm';
import PriceTable from 'components/PriceTable/PriceTable';
import PriceTableCar from 'components/PriceTableCar/PriceTableCar';
import sections from 'components/Prizes/Prizes.messages';

/**
 * @desc triggers show modal method with appropriate params
 * @param {Function} showModal - function resposible for rendering modal component
 * @param {String} modalTitle - title of modal component
 * @param {Object} props - modal component props
 * @returns {void}
 */
function showCheckPrizesModal(showModal, modalTitle, props) {
	showModal(modalTitle, CheckPrizeForm, props);
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
									this, showModal, section.modalTitle, section.modalProps
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
				Ceny mogą uledz zmianie bez uprzedzenia.</p>
		</div>
	);
};

Prizes.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Prizes;
