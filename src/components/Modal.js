import React from 'react';
import stopEventPropagation from 'helpers/stopPropagation';
import CloseIcon from 'components/CloseIcon';

const Modal = ({title, children, closeAction}) => {
	return (
		<div className="blackout" onClick={closeAction}>
			<div className="modal" onClick={stopEventPropagation}>
				<h2>{title}</h2>
				<CloseIcon action={closeAction}/>
				<div className="modal__content">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;