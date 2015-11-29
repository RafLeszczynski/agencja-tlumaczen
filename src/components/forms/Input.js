import React from 'react';
import classNames from 'classnames';

const Input = ({cssClasses, name, type, value, ...props}) => {
	let baseClasses = {
			input: true,
			input_empty: value === ''
		},
		combinedClasses = classNames(Object.assign({}, baseClasses, cssClasses));

	return (
		<input
			className={combinedClasses}
			name={name}
			type={type}
			{...props}
		/>
	);
};

Input.propTypes = {
	cssClasses: React.PropTypes.object,
	name: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired
};

Input.defaultProps = {
	type: 'text',
	value: ''
};

export default Input;
