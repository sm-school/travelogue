'use strict';

const tripApi = require('express').Router();
const fetch = require('node-fetch');

const { tripImages, tripLandmarks } = require('../controllers/trip');

const isLoggedIn = require('../helpers/isLoggedIn');

tripApi.get('/images/:tripId', isLoggedIn, (req, res) => {
	tripImages(req.params.tripId)
		.then ( images => res.status(200).json(images) )
		.catch( error => console.log('Error fetching trip:', error.message) );
});

tripApi.get('/landmarks/:tripId', isLoggedIn, (req, res) => {
	tripLandmarks(req.params.tripId)
		.then ( landmarks => res.status(200).json(landmarks) )
		.catch( error => console.log('Error fetching trip:', error.message) );
});

module.exports = tripApi;
