import 'components/CloseIcon/CloseIcon.scss';
import React from 'react';

const CloseIcon = ({action}) => {
	return(
		<div className="close-icon" onClick={action}>
			<span/>
			<span/>
		</div>
	);
};

CloseIcon.propsTypes = {
	action: React.PropTypes.func.isRequired
};

export default CloseIcon;