'use strict';

const db = require('../controllers/db');
const getSignatureS3 = require('../controllers/s3');

const api = require('express').Router();
const fetch = require('node-fetch');

api.get('/sign-s3', getSignatureS3);

api.get('/metadataRequired/:userId', (req, res) => {
	if (/^\d+$/.exec(req.params.userId)) {
		res.status(400).send('userId was not a number');
		return;
	}

	db.metadataRequired(req.params.userId)
		.then ( imageIds => {
			res.status(200).json(imageIds);
		})
		.catch( error => {
			console.log(error);
		});
});

module.exports = api;
