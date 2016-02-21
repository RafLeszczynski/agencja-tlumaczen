import fs from 'fs';

export default (files) => {
	files.map(file => {
		fs.unlink(file.path, (error) => {
			console.log(error);
		});
	})
}