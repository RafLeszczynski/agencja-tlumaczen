import nodemailer from 'nodemailer';

/**
 * @desc Sends emails with attachments using GMail transport
 * @param {String} gmailUser - GMail username
 * @param {String} gmailPass - GMail password
 */
export default class MailSender {
	/**
	 * @constructor
	 * @param {String} gmailUser - GMail username
	 * @param {String} gmailPass - GMail password
	 * @returns {void}
	 */
	constructor(gmailUser, gmailPass) {
		this.transporter = nodemailer.createTransport(`smtps://${gmailUser}%40gmail.com:${gmailPass}@smtp.gmail.com`);
	}

	/**
	 * @desc sends email based on given options
	 * @param {Object} mailOptions - message object
	 * @param {Function} cb - callback function
	 * @returns {void}
	 */
	send(mailOptions, cb) {
		this.transporter.sendMail(mailOptions, cb);
	}


	/**
	 * @desc creates message body
	 * @param {String} target - target email
	 * @param {Object} data - message body params
	 * @param {Array} attachments - file attachments
	 * @returns {Object} message object
	 */
	static createMessage(target, data, attachments) {
		return {
			from: `${data.name} ${data.email}`,
			to: target,
			subject: data.title,
			text: MailSender.createMessageText(data.email, data.message),
			html: MailSender.createMessageHtml(data.email, data.message),
			attachments
		};
	}

	/**
	 * @desc creates plain text email message
	 * @param {String} email - sender email
	 * @param {String} text - message text
	 * @returns {string} - plan text message with sender email
	 */
	static createMessageText(email, text) {
		return `Adres zwrotny: ${email} \n\n ${text}`;
	}

	/**
	 * @desc creates HTML email message
	 * @param {String} email - sender email
	 * @param {String} text - message text
	 * @returns {string} - HTML message with sender email
	 */
	static createMessageHtml(email, text) {
		return `<p>Adres zwrotny: <a href="mailto:${email}">${email}</a></p><p>${text}</p>`;
	}

	/**
	 * @desc prepare attachments array
	 * @param {Array} attachments row attachments array
	 * @returns {Array} sanitized attachments array
	 */
	static sanitizeAttachments(attachments) {
		return attachments.map(file => {
			return {
				filename: file.originalname,
				path: file.path
			};
		});
	}
}
