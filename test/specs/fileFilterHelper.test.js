import fileFilter, {supportedTypes, createUnsupportedTypeErrorObject} from '../../server/fileFilterHelper';

describe('Mail Sender tests', () => {
	it('accepts supported file types', () => {
		const requestMock = {};
		const files = supportedTypes.map(mimetype => {
			return {mimetype};
		});


		files.forEach(file => {
			const cb = jasmine.createSpy('cb');

			fileFilter(requestMock, file, cb);

			expect(cb).toHaveBeenCalled();
			expect(cb).toHaveBeenCalledWith(null, true);
		});
	});

	it('adds error details to request object for unsupported file types', () => {
		const requestMock = {};
		const unsupportedFileTypeErrorsKey = 'unsupportedFileTypeErrors';
		const cb = jasmine.createSpy('cb');
		const unsupportedType = 'application/unsupportedType';
		const unsupportedFiles = [
			{
				originalname: 'lorem.test',
				mimetype: unsupportedType
			},
			{
				originalname: 'ipsum.test',
				mimetype: unsupportedType
			}
		];

		unsupportedFiles.forEach(file => {
			fileFilter(requestMock, file, cb);
		});

		expect(cb).toHaveBeenCalledTimes(2);
		expect(cb).toHaveBeenCalledWith(null, false);
		expect(requestMock.hasOwnProperty(unsupportedFileTypeErrorsKey)).toBe(true);
		expect(Array.isArray(requestMock[unsupportedFileTypeErrorsKey])).toBe(true);
		expect(requestMock[unsupportedFileTypeErrorsKey].length).toBe(2);
	});

	it('creates correct unsupported file type error details object', () => {
		const mimeType = 'test/test';
		const fileName = 'tes.jpg';
		const errorDetails = createUnsupportedTypeErrorObject(fileName, mimeType);

		expect(errorDetails.message).toBe('File format not supported');
		expect(errorDetails.fileName).toBe(fileName);
		expect(errorDetails.mimeType).toBe(mimeType);
	});
});
