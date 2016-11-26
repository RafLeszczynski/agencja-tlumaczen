#! /usr/bin/env node

import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Application from './app/components/Application/Application';

const path = `${__dirname}/build/index.html`;

fs.readFile(path, 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	fs.writeFile(
		path,
		data.replace('{{content}}', ReactDOMServer.renderToString(<Application/>)),
		'utf8',
		error => {
			if (error) {
				console.log(error);
				return;
			}
		}
	);
});
