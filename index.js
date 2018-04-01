'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const config = require('./backend/configs/backend');
const router = require('./backend/routers/root');
const logger = require('morgan');

express()
	.use(logger('dev'))
	.use(express.static('backend/static'))
	.use(bodyParser.json())
	.use('/', router)
	.listen(config.PORT, () => {
		console.log(`Starting Travelogue on port ${config.PORT}.`);
	});
