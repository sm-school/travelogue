'use strict';

const db = require('../controllers/db');
const getSignatureS3 = require('../controllers/s3');
const imageMetadata = require('../controllers/imageMetadata');

const api = require('express').Router();
const fetch = require('node-fetch');

api.get('/sign-s3', getSignatureS3);

api.get('/metadata/:imageId', (req, res) => {
	// To do: regexp for image ID format
	// if (/^\d+$/.exec(req.params.userId)) {
	// 	res.status(400).send('invalid imageId');
	// 	return;
	// }

	imageMetadata(req.params.imageId)
		.then ( metadata => {
			res.status(200).json(metadata);
		})
		.catch( error => {
			console.log(error);
		});
});

module.exports = api;
