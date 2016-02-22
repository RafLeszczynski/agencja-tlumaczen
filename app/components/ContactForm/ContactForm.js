import 'components/forms/form.scss';
import React from 'react';
import * as validator from 'helpers/validator';
import TextField from 'components/forms/TextField';
import Button from 'components/Button/Button';
import * as messages from 'components/ContactForm/ContactForm.messages';
import trimFromStart from 'helpers/trim';

/**
 * @desc contact form react component
 */
export default class ContactForm extends React.Component {
	static nameFieldId = 'nameTextField';
	static emailFieldId = 'emailTextField';
	static textFieldId = 'textTextField';
	static fileFieldId = 'fileTextField';
	static isValidPrefix = 'isValid';

	/**
	 * @deac creates new instance and sets its state
	 * @param {Object} props - react props
	 */
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
		};
	}

	/**
	 * @desc renders component
	 * @returns {XML} - jsx markup
	 */
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
	 * @returns {Array} - form props
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
	 * @param {Object} formItem - props
	 * @param {Number} index - array index
	 * @returns {XML} - jsx markup
	 * @private
	 */
	_renderFormItem(formItem, index) {
		const id = formItem.id;

		return (
			<TextField
				key={index}
				multiline={formItem.multiline}
				id={id}
				type={formItem.type}
				label={formItem.label}
				isValid={this.state[ContactForm.isValidPrefix + id]}
				validationErrorMsg={formItem.validationErrorMsg}
				value={this.state[id]}
				onChange={this._handlerChange.bind(this)}
				onBlur={this._handlerBlur.bind(this)}
			/>
		);
	}

	/**
	 * @desc handles TextField and Textarea value changes
	 * @param {Event} event - browser event object
	 * @returns {void}
	 * @private
	 */
	_handlerChange(event) {
		const target = event.target;

		this.setState({
			[target.id]: trimFromStart(target.value)
		});
	}

	/**
	 * @desc handles validation on blur
	 * @param {Event} event - browser event object
	 * @returns {void}
	 * @private
	 */
	_handlerBlur(event) {
		const target = event.target;
		const value = target.value;
		const isEmail = target.type === 'email';

		this.setState({
			[ContactForm.isValidPrefix + target.id]: isEmail && validator.validateEmail(value) ||
				!isEmail && value !== ''
		});
	}
}
