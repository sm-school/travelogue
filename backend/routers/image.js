'use strict';

const imageApi = require('express').Router();
const fetch = require('node-fetch');

const { imageLandmarks, imageMetadata, storeImage } = require('../controllers/image');
const metadataApis = require('../controllers/metadataApis');

const isLoggedIn = require('../helpers/isLoggedIn');

imageApi.get('/fetchMetadata/:imageId', (req, res) => {
	metadataApis(req.params.imageId)
		.then ( metadata => {
			res.status(200).json(metadata);
		})
		.catch( error => {
			console.log(error);
		});
});

imageApi.get('/metadata/:imageId', (req, res) => {
	imageMetadata(req.params.imageId)
		.then( metadata => {
			res.status(200).json(metadata);
		})
		.catch( error => {
			console.log(error);
		});
});

imageApi.get('/landmarks/:imageId', (req, res) => {
	imageLandmarks(req.params.imageId)
		.then( landmarks => {
			res.status(200).json(landmarks);
		})
		.catch( error => {
			console.log(error);
		});
});

imageApi.post('/store', isLoggedIn, (req, res) => {
	storeImage({
		user: req.user,
		imageData: req.body,
	})
		.then( imageId => {
			return imageId;
		})
		// .then( ) // metadata APIs goes here
		.catch( error => {
			console.log(error);
		});
});

module.exports = imageApi;
