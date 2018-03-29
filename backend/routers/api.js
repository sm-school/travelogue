'use strict';

const db = require('../controllers/db');
const apiRouter = require('express').Router();
const fetch = require('node-fetch');

apiRouter.get('/something/:thing', (req, res) => {
	db.something(req.params.thing)
		.then ( something => {
			res.status(200).json(something);
		})
		.catch( error => {
			console.log(error);
		});
});

module.exports = apiRouter;
