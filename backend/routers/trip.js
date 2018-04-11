'use strict';

const tripApi = require('express').Router();
const fetch = require('node-fetch');

const { tripImages } = require('../controllers/trip');

const isLoggedIn = require('../helpers/isLoggedIn');

tripApi.get('/:tripId', isLoggedIn, (req, res) => {
	tripImages(req.params.tripId)
		.then ( images => res.status(200).json(images) )
		.catch( error => console.log('Error fetching trip:', error.message) );
});

module.exports = tripApi;
