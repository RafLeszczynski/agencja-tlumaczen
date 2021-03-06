import React from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import InputGroup from './InputGroup';
import Label from './Label';
import Input from './Input';
import ValidationErrorMsg from './ValidationErrorMsg';

/**
 * @desc renders Input component
 * @param {String} id - html element id attribute
 * @param {String} type - html element type attribute
 * @param {String} value - html element value attribute
 * @param {Function} onChange - change handler
 * @param {Function} onBlur - blur handler
 * @param {Boolean} disabled - disabled inpu attribute
 * @returns {XML} - jsx markup
 * @private
 */
function renderInput(id, type, value, onChange, onBlur, disabled) {
	const inputType = type || 'text';
	const isFileInput = inputType === 'file';
	const inputClasses = {
		input_file: isFileInput
	};

	return (
		<Input
			cssClasses={inputClasses}
			id={id}
			name={id}
			type={inputType}
			value={value}
			onChange={onChange}
			disabled={disabled}
			onBlur={!isFileInput && onBlur}
		/>
	);
}

/**
 * @desc renders TextareaAutosize component
 * @param {String} id - html element id attribute
 * @param {String} value - html element value attribute
 * @param {Function} onChange - change handler
 * @param {Function} onBlur - blur handler
 * @returns {XML} - jsx markup
 * @private
 */
function renderTextArea(id, value, onChange, onBlur) {
	const className = classNames({
		textarea: true,
		textarea_empty: value === ''
	});
	const minRows = 1;
	const maxRows = 6;

	return (
		<TextareaAutosize
			id={id}
			className={className}
			minRows={minRows}
			maxRows={maxRows}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
}

const TextField = ({id, isValid, label, multiline, onChange, onBlur, type, value, validationErrorMsg, disabled}) => {
	return (
		<InputGroup>
			{multiline ?
				renderTextArea(id, value, onChange, onBlur) :
				renderInput(id, type, value, onChange, onBlur, disabled)
			}
			<Label
				id={id}
				title={label}
			/>
			{!isValid && validationErrorMsg ? <ValidationErrorMsg errorMsg={validationErrorMsg}/> : ''}
		</InputGroup>
	);
};

TextField.propTypes = {
	id: React.PropTypes.string.isRequired,
	isValid: React.PropTypes.bool,
	label: React.PropTypes.node.isRequired,
	multiline: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	type: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
	validationErrorMsg: React.PropTypes.string,
	disabled: React.PropTypes.bool
};

export default TextField;
