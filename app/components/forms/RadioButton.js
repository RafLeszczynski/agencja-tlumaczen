import React from 'react';
import InputGroup from './InputGroup';
import Input from './Input';
import Label from './Label';

const RadioButton = ({id, value, isChecked, label, name, onClick}) => {
	const inputClasses = {
		input_radio: true,
		input_checked: isChecked
	};
	const inputGroupClasses = {
		'input-group_radio': true
	};

	return (
		<InputGroup cssClasses={inputGroupClasses}>
			<Input
				cssClasses={inputClasses}
				defaultChecked={isChecked}
				id={id}
				name={name}
				onClick={onClick}
				type='radio'
				value={value}
			/>
			<Label
				id={id}
				title={label}
			/>
		</InputGroup>
	);
};

RadioButton.propTypes = {
	id: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	isChecked: React.PropTypes.bool.isRequired,
	label: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired
};

export default RadioButton;
