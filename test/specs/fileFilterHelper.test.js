import fileFilter, {supportedTypes} from '../../server/fileFilterHelper';

describe('Mail Sender tests', () => {
	const requestMock = {};

	it('accepts supported file types', () => {
		const files = supportedTypes.map(mimetype => {
			return {mimetype}
		});

		files.forEach(file => {
			const cb = jasmine.createSpy('cb');

			fileFilter(requestMock, file, cb);

			expect(cb).toHaveBeenCalled();
			expect(cb).toHaveBeenCalledWith(null, true);
		});
	});

	it('throws error for not supported file types', () => {
		const cb = jasmine.createSpy('cb');
		const unsupportedType = 'application/unsupportedType';
		const error = new Error(`File format ${unsupportedType} not supported`);
		const unsupportedFileMock = {
			mimetype: unsupportedType
		};

		fileFilter(requestMock, unsupportedFileMock, cb);

		expect(cb).toHaveBeenCalled();
		expect(cb).toHaveBeenCalledWith(error);
	})
});
