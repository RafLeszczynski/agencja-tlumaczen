import React from 'react';

import CloseIcon from 'components/CloseIcon';

const Modal = ({title, children, closeAction}) => {
	return (
		<div className="blackout">
			<div className="modal">
				<h2>{title}</h2>
				<CloseIcon action={closeAction}/>
				{children}
			</div>
		</div>
	);
};

export default Modal;