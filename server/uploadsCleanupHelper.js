import fs from 'fs';
import logger from './logger';

/**
 * @desc removes files
 * @param {Array} files - array of file data
 * @returns {Boolean} - false
 */
export default files => {
	files.map(file => {
		const path = file.path;

		fs.unlink(file.path, error => {
			if (error) {
				logger.warn('Failed removing file %s', path, error);
			} else {
				logger.info('File %s was successfully removed', path);
			}
		});

		return false;
	});
};
