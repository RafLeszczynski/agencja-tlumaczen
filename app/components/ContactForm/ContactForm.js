import 'components/forms/form.scss';
import React from 'react';
import validateEmail from 'helpers/validator';
import TextField from 'components/forms/TextField';
import Button from 'components/Button/Button';
import CloseIcon from 'components/CloseIcon/CloseIcon';
import * as messages from 'components/ContactForm/ContactForm.messages';
import trimFromStart from 'helpers/trim';
import {supportedTypes} from '../../../server/fileFilterHelper';

/**
 * @desc contact form react component
 */
export default class ContactForm extends React.Component {
	static nameFieldId = 'nameTextField';
	static emailFieldId = 'emailTextField';
	static textFieldId = 'textTextField';
	static fileFieldId = 'fileTextField';
	static fileAttachments = 'fileAttachments';
	static maxFilesAttached = 'maxFilesAttached';
	static maxFileCount = 5;
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
			[ContactForm.fileAttachments]: [],
			[ContactForm.maxFilesAttached]: false,
			[ContactForm.isValidPrefix + ContactForm.nameFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.emailFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.textFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.fileFieldId]: true,
			submitInProgress: false,
			submitDone: false,
			submitResult: null
		};
	}

	/**
	 * @desc renders component
	 * @returns {XML} - jsx markup
	 */
	render() {
		return (
			<form className='form' autoComplete='on' onSubmit={this._submitForm.bind(this)}>
				{this._getFormData().map(this._renderFormItem, this)}
				{this.state[ContactForm.fileAttachments].map(this._renderFileAttachment, this)}
				<Button name={messages.submitLabel}/>
				{this.state.submitInProgress ? this._renderLoadingOverlay() : ''}
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
				label: ContactForm.renderAttachmentLabel(
					this.state[ContactForm.maxFilesAttached] ? messages.maxFileCount : messages.fileLabel
				),
				type: 'file',
				disabled: this.state[ContactForm.maxFilesAttached],
				validationErrorMsg: messages.wrongFileFormat
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
		const onChangeHandler = formItem.type === 'file' ? this._handleFileChange : this._handlerChange;

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
				onChange={onChangeHandler.bind(this)}
				onBlur={event => {
					this._validateInput(event.target);
				}}
				disabled={formItem.disabled}
			/>
		);
	}

	/**
	 * @desc renders file attachment
	 * @param {Object} attachment - file attachment details
	 * @param {Number} index - array index
	 * @returns {XML} - JSX markup
	 * @private
	 */
	_renderFileAttachment(attachment, index) {
		return (
			<div className='file-attachment' key={`attachment-${index}`}>
				<span>{attachment.name}</span>
				<CloseIcon action={this._removeFileAttachment.bind(this, index)}/>
			</div>
		);
	}

	/**
	 * @desc renders attachment label
	 * @param {String} label - attachment label
	 * @returns {XML} - JSX markup
	 */
	static renderAttachmentLabel(label) {
		return (
			<span className='add-attachment-input'>
				<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path d='M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z'/>
					<path d='M0 0h24v24H0V0z' fill='none'/>
				</svg>
				{label}
			</span>
		);
	}

	/**
	 * @desc renders loading info on form submit
	 * @returns {XML} - JSX markup
	 * @private
	 */
	_renderLoadingOverlay() {
		const throbber = <p>
			<span className='loading-throbber'/>
			<span>{messages.sendingEmail}</span>
		</p>;
		const message = this.state.submitResult ?
			<p>
				<span>{messages.sendSuccess}</span>
				<span>{messages.sendSuccessTooltip}</span>
			</p> :
			<p>
				<span>{messages.sendError}</span>
				<span>{messages.sendErrorTooltip}</span>
			</p>;

		return (
			<div className='loading-overlay blackout' onClick={() => {
				this.setState({
					submitInProgress: false,
					submitResult: null
				});
			}}>
				<div className='loading-info'>
					{this.state.submitResult === null ? throbber : message}
				</div>
			</div>
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
	 * handles file input value changes
	 * @param {Event} event - browser event object
	 * @returns {void}
	 * @private
	 */
	_handleFileChange(event) {
		const attachment = event.target.files[0];
		const isValid = attachment.size <= 1024 * 1024 && supportedTypes.indexOf(attachment.type) !== -1;

		if (isValid) {
			this.setState({
				[ContactForm.fileAttachments]: [...this.state[ContactForm.fileAttachments], attachment],
				[ContactForm.maxFilesAttached]: this.state[ContactForm.fileAttachments].length + 1 === ContactForm.maxFileCount,
				[ContactForm.isValidPrefix + ContactForm.fileFieldId]: isValid
			});
		} else {
			this.setState({
				[ContactForm.isValidPrefix + ContactForm.fileFieldId]: isValid
			});
		}
	}

	/**
	 * @desc removes file attachment from state
	 * @param {Number} fileIndex - array index
	 * @returns {void}
	 * @private
	 */
	_removeFileAttachment(fileIndex) {
		this.setState({
			[ContactForm.fileAttachments]: this.state[ContactForm.fileAttachments].filter((file, index) => {
				return fileIndex !== index;
			}),
			[ContactForm.maxFilesAttached]: false
		});
	}

	/**
	 * @desc handles validation on blur
	 * @param {Element} target - form element
	 * @returns {Boolean} - validation result
	 * @private
	 */
	_validateInput(target) {
		const value = target.value;
		const isEmail = target.type === 'email';
		const isValid = isEmail && validateEmail(value) || !isEmail && value !== '';

		this.setState({
			[ContactForm.isValidPrefix + target.id]: isValid
		});

		return isValid;
	}

	/**
	 * @desc validates form before submit
	 * @returns {boolean} - form validation result
	 * @private
	 */
	_validateForm() {
		const validationErrors = Array.prototype.filter.call(
			document.querySelectorAll(
				`#${ContactForm.nameFieldId}, #${ContactForm.emailFieldId}, #${ContactForm.textFieldId}`
			),
			node => {
				return !this._validateInput(node);
			}
		);

		return validationErrors.length === 0;
	}

	/**
	 * @desc submits contact form
	 * @param {Event} event - click event
	 * @returns {void}
	 * @private
	 */
	_submitForm(event) {
		event.preventDefault();

		if (this._validateForm()) {
			this.setState({
				submitInProgress: true
			});

			fetch('/sendMessage', {
				method: 'POST',
				body: this._createFormData()
			}).then(response => {
				this.setState({
					submitResult: response.ok
				});

				this._resetFormState();
			});
		}
	}

	/**
	 * @desc creates form data object
	 * @returns {FormData} - form data object
	 * @private
	 */
	_createFormData() {
		const formData = new FormData();

		formData.append('name', this.state[ContactForm.nameFieldId]);
		formData.append('email', this.state[ContactForm.emailFieldId]);
		formData.append('message', this.state[ContactForm.textFieldId]);
		formData.append('title', messages.messageTitle);

		this.state[ContactForm.fileAttachments].forEach(file => {
			formData.append('files', file);
		});

		return formData;
	}

	/**
	 * @desc resets form state
	 * @returns {void}
	 * @private
	 */
	_resetFormState() {
		this.setState({
			[ContactForm.nameFieldId]: '',
			[ContactForm.emailFieldId]: '',
			[ContactForm.textFieldId]: '',
			[ContactForm.fileFieldId]: '',
			[ContactForm.fileAttachments]: [],
			[ContactForm.maxFilesAttached]: false,
			[ContactForm.isValidPrefix + ContactForm.nameFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.emailFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.textFieldId]: true,
			[ContactForm.isValidPrefix + ContactForm.fileFieldId]: true
		});
	}
}
