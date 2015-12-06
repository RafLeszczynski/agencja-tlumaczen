import React from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import InputGroup from 'components/forms/InputGroup';
import Label from 'components/forms/Label';
import Input from 'components/forms/Input';
import ValidationErrorMsg from 'components/forms/ValidationErrorMsg';

const TextField = ({id, isValid, label, multiline, onChange, onBlur, type, value, validationErrorMsg}) => {
	return (
		<InputGroup >
			{!multiline ?
				renderInput(id, type, value, onChange, onBlur) :
				renderTextArea(id, value, onChange, onBlur)
			}
			<Label
				id={id}
				title={label}
			/>
			{!isValid && validationErrorMsg ? <ValidationErrorMsg errorMsg={validationErrorMsg}/> : ''}
		</InputGroup>
	);
};


/**
 * @desc renders Input component
 * @param {String} id
 * @param {String} type
 * @param {String} value
 * @param {Function} onChange
 * @param {Function} onBlur
 * @returns {XML}
 * @private
 */
function renderInput(id, type, value, onChange, onBlur) {
	const inputType = type || 'text',
		isFileInput = inputType === 'file',
		inputClasses = {
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
			onBlur={!isFileInput && onBlur}
		/>
	)
}

/**
 * @desc renders TextareaAutosize component
 * @param {String} id
 * @param {String} value
 * @param {Function} onChange
 * @param {Function} onBlur
 * @returns {XML}
 * @private
 */
function renderTextArea(id, value, onChange, onBlur) {
	const className = classNames({
			textarea: true,
			textarea_empty: value === ''
		});

	return (
		<TextareaAutosize
			id={id}
			className={className}
			minRows={1}
			maxRows={6}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	)
}

TextField.propTypes = {
	id: React.PropTypes.string.isRequired,
	isValid: React.PropTypes.bool,
	label: React.PropTypes.string.isRequired,
	multiline: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	type: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
	validationErrorMsg: React.PropTypes.string
};

export default TextField;