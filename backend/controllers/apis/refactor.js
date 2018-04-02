'use strict';

// const processImage = require('./vision');
const imageMetadata = require('../imageMetadata');

// processImage('pisa')
// 	.then( data => {
// 		console.log(JSON.stringify(data));
// 	});

let example = {
	'imageId': 'pisa',
	'landmarks': [
		{
			'name': 'Piazza dei Miracoli',
			'latitude': 43.722855,
			'longitude': 10.395813,
		}, {
			'name': 'Pisa',
			'latitude': 43.759192,
			'longitude': 10.371093,
		},
	],
};

imageMetadata('pisa')
	.then( data => {
		console.log(JSON.stringify(data));
	});

