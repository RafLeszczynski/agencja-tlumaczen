import errorLogger, {createErrorMessageTemplate} from '../../server/errorLogger';

describe('Error logger middleware test', () => {
	const errorMock = {
		message: 'error message',
		statusCode: 1,
		errorCode: 2,
		details: {},
		stack: ''
	};
	const requestMock = {
		files: [],
		body: {}
	};
	const responseMock = {};
	const nextSpy = jasmine.createSpy('nextSpy');
	const ExpectedMessageTemplate = [
		errorMock.message,
		'details: %j',
		'context: %j',
		'stacktrace for: %s'
	].join('\n');
	const loggerMock = {
		error: jasmine.createSpy('loggerSpy')
	};

	beforeAll(() => {
		// mock ES6 logger module imported in errorLogger
		errorLogger.__Rewire__('logger', loggerMock);
	});

	afterAll(() => {
		// reset import mock
		errorLogger.__ResetDependency__('logger');
	});

	it('creates correct logger message template', () => {
		expect(createErrorMessageTemplate(errorMock.message)).toBe(ExpectedMessageTemplate);
	});

	it('sends correct error log', () => {
		errorLogger(errorMock, requestMock, responseMock, nextSpy);
		expect(loggerMock.error).toHaveBeenCalledWith(
			ExpectedMessageTemplate,
			errorMock.details,
			{
				body: requestMock.body,
				files: requestMock.files
			},
			errorMock.stack
		);
	});

	it('sends error to next middleware', () => {
		errorLogger(errorMock, requestMock, responseMock, nextSpy);
		expect(nextSpy).toHaveBeenCalledWith(errorMock);
	});
});
