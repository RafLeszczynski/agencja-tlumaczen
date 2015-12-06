import 'components/Prizes/Prizes.scss';

import React from 'react';

import Button from 'components/Button';
import CheckPrizeForm from 'components/CheckPrizeForm/CheckPrizeForm';
import sections from 'components/Prizes/Prizes.messages';

const prizesWrapperClassName = 'prizes',
	prizesSectionClassName = 'prizes__section',
	prizesDescriptionClassName = 'prizes__section__description',

	Prizes = ({showModal}) => {
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
					)
				})}
			</div>
		)
	};

Prizes.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

/**
 * @desc triggers show modal method with appropriate params
 * @param {Function} showModal
 * @param {String} modalTitle
 * @param {Object} props
 */
function showCheckPrizesModal(showModal, modalTitle, props) {
	showModal(modalTitle, CheckPrizeForm, props);
}

export default Prizes;