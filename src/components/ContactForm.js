import 'components/forms/form.scss';
import React from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import * as validator from 'helpers/validator';
import InputGroup from 'components/forms/InputGroup';
import Label from 'components/forms/Label';
import Input from 'components/forms/Input';
import ValidationErrorMsg from 'components/forms/ValidationErrorMsg';
import Button from 'components/Button';
import * as messages from 'messages/contactForm.messages';
import trimFromStart from 'helpers/trim'

export default class ContactForm extends React.Component {
	static nameFieldId = 'nameTextField';
	static emailFieldId = 'emailTextField';
	static textFieldId = 'textTextField';
	static fileFieldId = 'fileTextField';
	static isValidPrefix = 'isValid';

	constructor(props) {
		super(props);

		this.state = {
			[ContactForm.nameFieldId]: '',
			[ContactForm.emailFieldId]: '',
			[ContactForm.textFieldId]: '',
			[ContactForm.fileFieldId]: '',
			[ContactForm.isValidPrefix + ContactForm.nameFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.emailFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.textFieldId]: true
		}
	}

	render() {
		return (
				<form className='form' autoComplete='on'>
					{this._getFormData().map(this._renderFormItem, this)}
					<Button name={messages.submitLabel} />
				</form>
		);
	}

	/**
	 * @desc returns form data
	 * @returns {Array}
	 * @private
	 */
	_getFormData() {
		return [
			{
				id: ContactForm.nameFieldId,
				label: messages.nameLabel,
				type: 'text',
				validationErrorMsg: messages.emptyInputError
			},
			{
				id: ContactForm.emailFieldId,
				label: messages.emailLabel,
				type: 'email',
				validationErrorMsg: messages.wrongEmailFormat
			},
			{
				id: ContactForm.textFieldId,
				label: messages.textLabel,
				multiline: true,
				validationErrorMsg: messages.emptyInputError
			},
			{
				id: ContactForm.fileFieldId,
				label: this.state[ContactForm.fileFieldId] || messages.fileLabel,
				type: 'file'
			}
		];
	}

	/**
	 * @desc renders form item
	 * @param {Object} formItem
	 * @param {Number} index
	 * @returns {XML}
	 * @private
	 */
	_renderFormItem(formItem, index) {
		let id = formItem.id;

		return (
			<InputGroup key={index}>
				{!formItem.multiline ?
						this._renderInput(id, formItem.type) :
						this._renderTextArea(id)
				}
				<Label
					id={id}
					title={formItem.label}
				/>
				{this._renderErrorMessage(id, formItem.validationErrorMsg)}
			</InputGroup>
		);
	}

	/**
	 * @desc render validation error message
	 * @param {String} id
	 * @param {String} errorMessage
	 * @returns {XML}
	 * @private
	 */
	_renderErrorMessage(id, errorMessage) {
		if (!this.state[ContactForm.isValidPrefix + id]) {
			return <ValidationErrorMsg errorMsg={errorMessage}/>
		}
	}

	/**
	 * @desc renders Input component
	 * @param {String} id
	 * @param {String} type
	 * @returns {XML}
	 * @private
	 */
	_renderInput(id, type) {
		let isFileInput = type === 'file',
			inputClasses = {
				input_file: isFileInput
			};

		return (
			<Input
				cssClasses={inputClasses}
				id={id}
				name={id}
				type={type}
				value={this.state[id]}
				onChange={this._handlerChange.bind(this)}
				onBlur={!isFileInput && this._handlerBlur.bind(this)}
			/>
		)
	}

	/**
	 * @desc renders TextareaAutosize component
	 * @param {String} id
	 * @param {Boolean} isRequired
	 * @returns {XML}
	 * @private
	 */
	_renderTextArea(id) {
		let value = this.state[id],
			className = classNames({
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
				onChange={this._handlerChange.bind(this)}
				onBlur={this._handlerBlur.bind(this)}
			/>
		)
	}

	/**
	 * @desc handles TextField and Textarea value changes
	 * @param {Event} event
	 * @private
	 */
	_handlerChange(event) {
		let target = event.target;

		this.setState({
			[target.id]: trimFromStart(target.value)
		});
	}

	/**
	 * @desc handles validation on blur
	 * @param event
	 * @private
	 */
	_handlerBlur(event) {
		let target = event.target,
			value = target.value,
			isEmail = target.type === 'email';

		this.setState({
			[ContactForm.isValidPrefix + target.id]: isEmail && validator.validateEmail(value) ||
				!isEmail && value !== ''
		})
	}
}