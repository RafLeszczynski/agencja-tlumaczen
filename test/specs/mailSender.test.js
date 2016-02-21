import MailSender from '../../server/mailSender'

describe('Mail Sender tests', () => {
	it('creates proper message object', () => {
		const targetEmail = 'test@test.com';
		const email = 'test2@test.com';
		const message = 'lorem ipsum dolor';
		const name = 'Jan Kowalski';
		const title = 'lorem ipsum';
		const bodyData = {email, message, name, title};
		const attachments = [1, 2, 3];
		const messageObject = MailSender.createMessage(targetEmail, bodyData, attachments);

		expect(messageObject.from).toBe(`${name} ${email}`);
		expect(messageObject.to).toBe(targetEmail);
		expect(messageObject.subject).toBe(title);
		expect(messageObject.text).toBe(message);
		expect(messageObject.attachments).toBe(attachments);
	});
});
