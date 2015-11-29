require('../scss/components/contact.scss');

import React from 'react';
import Button from 'components/Button';

const Contact = ({contactUs, email, fax, phones, showModal}) => {
	return (
		<div className="contact">
			{phones.map((number, index) => {
				return (
					<span key={index} className="contact__phone">
						<a href={`tel:${number}`}>{number}</a>
					</span>
				);
			})}
			<span className="contact__fax">{fax}</span>
			<span className="contact__email">{email}</span>
			<Button name={contactUs} action={showContactForm.bind(this, showModal, contactUs)} />
		</div>
	);
};

function showContactForm(showModal, contactUs) {
	showModal(contactUs);
}

Contact.propTypes = {
	contactUs: React.PropTypes.string.isRequired,
	email: React.PropTypes.string.isRequired,
	fax: React.PropTypes.string.isRequired,
	phones: React.PropTypes.array.isRequired,
	showModal: React.PropTypes.func.isRequired
};

export default Contact;
