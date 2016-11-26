import React from 'react';
import Button from '../Button/Button';
import ContactForm from '../ContactForm/ContactForm';
import * as messages from './Contact.messages';

/**
 * @desc renders phone number
 * @param {Number} number - phone number
 * @param {Number} index - array index
 * @returns {XML} - jsx markup
 */
function renderPhoneNumber(number, index) {
	return (
		<span key={index} className='contact__phone'>
			<a href={`tel:${number}`}>{number}</a>
		</span>
	);
}

/**
 * @desc triggers displaying contact form modal
 * @param {Function} showModal - function responsible for rendering modal component
 * @param {Object} contactUs - props
 * @returns {void}
 */
function showContactForm(showModal, contactUs) {
	showModal(contactUs, ContactForm);
}

const Contact = ({showModal}) => {
	return (
		<div className='contact'>
			{messages.phones.map(renderPhoneNumber)}
			<span className='contact__fax'>{messages.fax}</span>
			<span className='contact__email'>{messages.email}</span>
			<Button name={messages.contactUs} action={showContactForm.bind(this, showModal, messages.contactUs)} />
		</div>
	);
};

Contact.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Contact;
