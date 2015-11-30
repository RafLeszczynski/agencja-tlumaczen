import 'components/Prizes/Prizes.scss';
import React from 'react';
import Button from 'components/Button';
import * as messages from 'messages/prizes.messages';

const prizesWrapperClassName = 'prizes',
	prizesSectionClassName = 'prizes__section',
	prizesDescriptionClassName = 'prizes__section__description',

	Prizes = ({showModal}) => {
		return (
			<div className={prizesWrapperClassName}>
				{messages.sections.map((section, index) => {
					return (
						<div key={index} className={prizesSectionClassName}>
							<p className={prizesDescriptionClassName}>
								{section.description}
							</p>
							<Button
								name={section.button}
								action={showCheckPrizesModal.bind(this, showModal, section.modalTitle)}
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

function showCheckPrizesModal(showModal, modalTitle) {
	showModal(modalTitle);
}

export default Prizes;