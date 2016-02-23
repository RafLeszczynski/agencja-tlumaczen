import 'components/Prizes/Prizes.scss';
import React from 'react';
import Button from 'components/Button/Button';
import CheckPrizeForm from 'components/CheckPrizeForm/CheckPrizeForm';
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
	);
};

Prizes.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Prizes;
