import fs from 'fs';

/**
 * @desc removes files
 * @param {Array} files - array of file data
 * @returns {Boolean} - false
 */
export default files => {
	files.map(file => {
		fs.unlink(file.path, error => {
			console.log(error);
		});

		return false;
	});
};
