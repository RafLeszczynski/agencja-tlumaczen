require('../scss/components/form.scss');

import React from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import * as messages from 'messages/contactForm';

export default class ContactForm extends React.Component {
	static nameFieldId = 'nameTextField';
	static emailFieldId = 'emailTextField';
	static textFieldId = 'textTextField';
	static fileFieldId = 'fileTextField';

	state = {
		[ContactForm.nameFieldId]: '',
		[ContactForm.emailFieldId]: '',
		[ContactForm.textFieldId]: '',
		[ContactForm.fileFieldId]: ''
	};

	/**
	 * @desc trims whitespace from beginning of the string
	 * @param {String} value
	 * @todo: move to helper and add tests
	 * @returns {String}
	 */
	static trimValue(value) {
		return value.replace(/^\s+/g,'');
	}

	/**
	 * @desc handles TextField and Textarea value changes
	 * @param {Event} event
	 */
	handlerChange(event) {
		let target = event.target;

		this.setState({
			[target.id]: ContactForm.trimValue(target.value)
		});
	}

	render() {
		return (
			<form
				className='form'
				autoComplete='on'
			>
				<TextField
					id={ContactForm.nameFieldId}
					label={messages.nameLabel}
					value={this.state[ContactForm.nameFieldId]}
					isRequired
					onChange={this.handlerChange.bind(this)}
					validationErrorMsg={messages.emptyInputError}
				/>
				<TextField
					id={ContactForm.emailFieldId}
					label={messages.emailLabel}
					value={this.state[ContactForm.emailFieldId]}
					isRequired
					email
					onChange={this.handlerChange.bind(this)}
					validationErrorMsg={messages.wrongEmailFormat}
				/>
				<TextField
					id={ContactForm.textFieldId}
					label={messages.textLabel}
					value={this.state[ContactForm.textFieldId]}
					isRequired
					multiLine
					onChange={this.handlerChange.bind(this)}
					validationErrorMsg={messages.emptyInputError}
				/>
				<TextField
					id={ContactForm.fileFieldId}
					label={this.state[ContactForm.fileFieldId] || messages.fileLabel}
					value={this.state[ContactForm.fileFieldId]}
					file
					onChange={this.handlerChange.bind(this)}
				/>
				<Button
					name={messages.submitLabel}
				/>
			</form>
		);
	}
}