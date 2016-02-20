import React from 'react';

const ValidationErrorMsg = ({errorMsg}) => {
	return (
		<span className='validation-error'>
			{errorMsg}
		</span>
	)
};

ValidationErrorMsg.propTypes = {
	errorMsg: React.PropTypes.string.isRequired
};

export default ValidationErrorMsg;
