'use strict';

<<<<<<< HEAD:backend/routers/apiRouter.js
=======
const db = require('../controllers/db');
>>>>>>> f2fac23ff323d61fbdbaafb2b46ad82823e53aea:backend/routers/api.js
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
