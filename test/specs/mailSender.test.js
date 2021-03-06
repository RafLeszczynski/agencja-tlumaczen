import MailSender from '../../server/mailSender';

describe('Mail Sender tests', () => {
	it('creates proper message object', () => {
		const targetEmail = 'test@test.com';
		const email = 'test2@test.com';
		const message = 'lorem ipsum dolor';
		const name = 'Jan Kowalski';
		const title = 'lorem ipsum';
		const bodyData = {email, message, name, title};
		const attachments = [];
		const messageObject = MailSender.createMessage(targetEmail, bodyData, attachments);

		expect(messageObject.from).toBe(`${name} ${email}`);
		expect(messageObject.to).toBe(targetEmail);
		expect(messageObject.subject).toBe(title);
		expect(messageObject.text).toBe(`Adres zwrotny: ${email} \n\n ${message}`);
		expect(messageObject.html).toBe(
			`<p>Adres zwrotny: <a href="mailto:${email}">${email}</a></p><p>${message}</p>`
		);
		expect(messageObject.attachments).toBe(attachments);
	});

	it('sanitizes attachments data', () => {
		const files = [
			{
				originalname: 'lorem ipsum',
				path: 'upload/file1.jpg',
				fakeProp: 'test'
			},
			{
				originalname: 'ipsum lorem',
				path: 'upload/file2.jpg',
				fakeProp2: 'test123'
			}
		];
		const filenameKey = 'filename';
		const pathKey = 'path';
		const attachments = MailSender.sanitizeAttachments(files);
		const keyCount = 2;

		attachments.forEach((attachment, index) => {
			const keys = Object.keys(attachment);

			expect(keys.length).toBe(keyCount);
			expect(attachment.hasOwnProperty(filenameKey)).toBe(true);
			expect(attachment[filenameKey]).toBe(files[index].originalname);
			expect(attachment.hasOwnProperty(pathKey)).toBe(true);
			expect(attachment[pathKey]).toBe(files[index].path);
		});
	});
});
