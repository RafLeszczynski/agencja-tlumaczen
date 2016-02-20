import nodemailer from 'nodemailer';

export default class MailSender {
	/**
	 * @constructor
	 * @param {String} gmailUser
	 * @param {String} gmailPass
	 */
	constructor(gmailUser, gmailPass) {
		this.transporter = nodemailer.createTransport(`smtps://${gmailUser}%40gmail.com:${gmailPass}@smtp.gmail.com`);
	}

	/**
	 * @desc sends email based on given options
	 * @param {Object} mailOptions
	 * @param {Function} cb
	 */
	send(mailOptions, cb) {
		this.transporter.sendMail(mailOptions, cb);
	}


	/**
	 * @desc creates message body
	 * @param {String} target - target email
	 * @param {Object} data - message body params
	 * @param {Array} attachments - file attachments
	 * @returns {Object}
	 */
	static createMessage(target, data, attachments) {
		return {
			from: `${data.name} ${data.email}`,
			to: target,
			subject: data.title,
			text: data.message,
			attachments
		};
	}

	/**
	 * @desc prepare attachments array
	 * @param {Array} attachments
	 * @returns {Array}
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