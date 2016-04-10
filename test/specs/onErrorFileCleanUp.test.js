import onErrorFileCleanUp from '../../server/onErrorFileCleanUp';

describe('On Error file clean up middleware tests', () => {
	const errorMock = {
		message: 'error message'
	};
	const requestMock = {
		files: []
	};
	const responseMock = {};
	const nextSpy = jasmine.createSpy('nextSpy');

	it('calls next callback', () => {
		onErrorFileCleanUp(errorMock, requestMock, responseMock, nextSpy);
		expect(nextSpy.calls.mostRecent().args[0]).toBe(errorMock);
	});

	it('calls upload cleanup method if error and files exists', () => {
		const uploadsCleanupSpy = jasmine.createSpy('uploadsCleanupSpy');

		// mock ES6 uploadsCleanup module imported in onErrorFileCleanUp
		onErrorFileCleanUp.__Rewire__('uploadsCleanup', uploadsCleanupSpy);

		onErrorFileCleanUp(errorMock, requestMock, responseMock, nextSpy);
		expect(uploadsCleanupSpy).toHaveBeenCalledWith(requestMock.files);

		// reset import mock
		onErrorFileCleanUp.__ResetDependency__('uploadsCleanup');
	});
});
