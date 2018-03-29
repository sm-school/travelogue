'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const env = require('./backend/configs/env');
const rootRouter = require('./backend/routers/rootRouter');
const logger = require('morgan');

if (!env['DB_URL']) {
	console.log(`Can't run Travelogue: ${env} not set.`);
	process.exit(1);
}

console.log(__dirname);

express()
	.use(logger('dev'))
	.use(express.static('backend/static'))
	.use(bodyParser.json())
	.use('/', rootRouter)
	.listen(env.PORT, () => {
		console.log(`Starting Travelogue on port ${env.PORT}.`);
	});
