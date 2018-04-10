'use strict';

const tripApi = require('express').Router();
const fetch = require('node-fetch');

const { userImages } = require('../controllers/trip');

const isLoggedIn = require('../helpers/isLoggedIn');

tripApi.get('/:tripId', isLoggedIn, (req, res) => {
	userImages(req.params.tripId)
		.then ( images => res.status(200).json(images) )
		.catch( error => console.log('Error fetching trip:', error.message) );
});

// Trips not yet implemented in database. For the time being,
// get all images associated with a user ID
// tripApi.get('/userImages/:userId', isLoggedIn, (req, res) => {
// 	userImages(req.params.userId)
// 		.then ( images => res.status(200).json(images) )
// 		.catch( error => console.log('Error fetching trip:', error.message) );
// });

module.exports = tripApi;
