'use strict';
const fetch = require('node-fetch');

const api = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');

const imageLandmarks = require('../controllers/db').imageLandmarks;
const imageMetadata = require('../controllers/db').imageMetadata;
const storeImage = require('../controllers/db').storeImage;
const getSignatureS3 = require('../controllers/s3');
const metadataApis = require('../controllers/metadataApis');

const isLoggedIn = require('../helpers/isLoggedIn');

api.use('/auth',authRouter);
api.use('/user',userRouter);

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
	imageMetadata(req.params.imageId)
		.then( metadata => {
			res.status(200).json(metadata);
		})
		.catch( error => {
			console.log(error);
		});
});

api.get('/landmarks/:imageId', (req, res) => {
	imageLandmarks(req.params.imageId)
		.then( landmarks => {
			res.status(200).json(landmarks);
		})
		.catch( error => {
			console.log(error);
		});
});

api.post('/images', isLoggedIn, (req, res) => {
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

module.exports = api;
