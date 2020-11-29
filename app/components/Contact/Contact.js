import React from 'react';
import Button from '../Button/Button';
import ContactForm from '../ContactForm/ContactForm';
import * as messages from './Contact.messages';

/**
 * @desc renders phone number
 * @param {Object} phoneObj - phone number
 * @param {Number} index - array index
 * @returns {XML} - jsx markup
 */
function renderPhoneNumber(phoneObj, index) {
	console.log(phoneObj);
	return (
		<span key={index} className='contact__phone'>
			{phoneObj.label}: <a href={`tel:${phoneObj.number}`}>{phoneObj.number}</a>
		</span>
	);
}



/**
 * @desc renders email
 * @param {String} email - phone number
 * @param {Number} index - array index
 * @returns {XML} - jsx markup
 */
function renderEmail(email, index) {
	return (
		<span key={index} className='contact__email'>{email}</span>
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
			{messages.emails.map(renderEmail)}
			<Button name={messages.contactUs} action={showContactForm.bind(this, showModal, messages.contactUs)} />
		</div>
	);
};

Contact.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Contact;
