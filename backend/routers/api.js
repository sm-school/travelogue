'use strict';

const express = require('express');
const fetch = require('node-fetch');
const api  = express.Router();

const db = require('./db.js');

api.get('/something/:thing', (req, res) => {
	db.something(req.params.thing)
		.then ( something => {
			res.status(200).json(something);
		})
		.catch( error => {
			console.log(error);
		});
});

module.exports = api;