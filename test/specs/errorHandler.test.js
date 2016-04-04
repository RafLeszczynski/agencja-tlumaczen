import errorHandler, {createErrorResponseJsonObject} from '../../server/errorHandler';

describe('Error handler middleware test', () => {
	const errorMock = {
		message: 'error message',
		statusCode: 1,
		errorCode: 2,
		details: {},
		additionalContext: {}
	};
	const requestMock = {
		files: []
	};
	const json = jasmine.createSpy('json');
	const statusReturnValueMock = {
		json
	};
	const status = jasmine.createSpy('status').and.returnValue(statusReturnValueMock);
	const responseMock = {
		status
	};
	const nextSpy = jasmine.createSpy('nextSpy');

	it('creates proper error response JSON object', () => {
		const responseObject = createErrorResponseJsonObject(errorMock);

		expect(responseObject.message).toBe(errorMock.message);
		expect(responseObject.errorCode).toBe(errorMock.errorCode);
		expect(responseObject.details).toBe(errorMock.details);
	});

	it('sends correct error response with custom statusCode', () => {
		errorHandler(errorMock, requestMock, responseMock, nextSpy);

		expect(status).toHaveBeenCalledWith(errorMock.statusCode);
		expect(json).toHaveBeenCalledWith(createErrorResponseJsonObject(errorMock));
	});

	it('sends correct error response with default statusCode', () => {
		const errorMockCopy = Object.assign({}, errorMock);

		delete errorMockCopy.statusCode;
		errorHandler(errorMockCopy, requestMock, responseMock, nextSpy);

		expect(status).toHaveBeenCalledWith(500);
		expect(json).toHaveBeenCalledWith(createErrorResponseJsonObject(errorMockCopy));
	});
});
