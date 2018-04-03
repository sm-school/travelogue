'use strict';

const imageLandmarks = require('../controllers/db').imageLandmarks;
const getSignatureS3 = require('../controllers/s3');
const metadataApis = require('../controllers/metadataApis');

const api = require('express').Router();
const fetch = require('node-fetch');

api.get('/sign-s3', getSignatureS3);

api.get('/fetchMetadata/:imageId', (req, res) => {
	metadataApis(req.params.imageId)
		.then ( metadata => {
			res.status(200).json(metadata);
		})
		.catch( error => {
			console.log(error);
		});
});

api.get('/metadata/:imageId', (req, res) => {
	// To do: regexp for image ID format
	// if (/^\d+$/.exec(req.params.userId)) {
	// 	res.status(400).send('invalid imageId');
	// 	return;
	// }

	imageLandmarks(req.params.imageId)
		.then( landmarks => {
			res.status(200).json({
				imageId: req.params.imageId,
				landmarks: landmarks,
			});
		})
		.catch( error => {
			console.log(error);
		});
});

module.exports = api;
