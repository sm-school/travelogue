'use strict';

const apiRouter = require('express').Router();
const s3Router =require('./s3Router');
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

apiRouter.use(s3Router);

module.exports = apiRouter;
