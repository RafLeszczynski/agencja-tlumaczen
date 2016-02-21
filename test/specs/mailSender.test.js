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

		attachments.forEach((attachment, index) => {
			const keys = Object.keys(attachment);
			expect(keys.length).toBe(2);
			expect(attachment.hasOwnProperty(filenameKey)).toBe(true);
			expect(attachment[filenameKey]).toBe(files[index].originalname);
			expect(attachment.hasOwnProperty(pathKey)).toBe(true);
			expect(attachment[pathKey]).toBe(files[index].path);
		});
	});
});
