import React from 'react';
import InputGroup from 'components/forms/InputGroup';
import Input from 'components/forms/Input';
import Label from 'components/forms/Label';

const RadioButton = ({id, value, isChecked, label, name, onClick}) => {
	let inputClasses = {
			input_radio: true,
			input_checked: isChecked
		},
		inputGroupClasses = {
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
	isChecked:React.PropTypes.bool.isRequired,
	label: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired
};

export default RadioButton;
