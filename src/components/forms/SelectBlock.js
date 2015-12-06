import React from 'react';
import Select from 'react-select';
import InputGroup from 'components/forms/InputGroup';
import Label from 'components/forms/Label';

const SelectBlock = ({className, id, label, onChange, options, placeholder, value}) => {
	let inputGroupClasses = {
		'input-group_select': true
	};

	return (
		<InputGroup className={inputGroupClasses}>
			<Select
				className={className}
				clearable={false}
				id={id}
				options={options}
				placeholder={placeholder}
				searchable={false}
				onChange={onChange}
				value={value}
			/>
			<Label
				id={id}
				title={label}
			/>
		</InputGroup>
	);
};

SelectBlock.propTypes = {
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.array.isRequired,
	placeholder: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired
};

export default SelectBlock;