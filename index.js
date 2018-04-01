'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const env = require('./backend/configs/env');
const router = require('./backend/routers/root');
const logger = require('morgan');

express()
	.use(logger('dev'))
	.use(express.static('backend/static'))
	.use(bodyParser.json())
	.use('/', router)
	.listen(env.PORT, () => {
		console.log(`Starting Travelogue on port ${env.PORT}.`);
	});
