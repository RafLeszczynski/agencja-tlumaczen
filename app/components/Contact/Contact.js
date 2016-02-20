import 'components/Contact/Contact.scss';
import React from 'react';
import Button from 'components/Button/Button';
import ContactForm from 'components/ContactForm/ContactForm';
import * as messages from 'components/Contact/Contact.messages';

const Contact = ({showModal}) => {
	return (
		<div className="contact">
			{messages.phones.map(renderPhoneNumber)}
			<span className="contact__fax">{messages.fax}</span>
			<span className="contact__email">{messages.email}</span>
			<Button name={messages.contactUs} action={showContactForm.bind(this, showModal, messages.contactUs)} />
		</div>
	);
};

/**
 * @desc renders phone number
 * @param {Number} number
 * @param {Number} index
 * @returns {XML}
 */
function renderPhoneNumber(number, index) {
	return (
		<span key={index} className="contact__phone">
			<a href={`tel:${number}`}>{number}</a>
		</span>
	);
}

/**
 * @desc triggers displaying contact form modal
 * @param {Function} showModal
 * @param {Object} contactUs
 */
function showContactForm(showModal, contactUs) {
	showModal(contactUs, ContactForm);
}

Contact.propTypes = {
	showModal: React.PropTypes.func.isRequired
};

export default Contact;
