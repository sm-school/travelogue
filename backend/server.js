'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const api = require('./api.js');

[
	'TRAVELOGUE_DB_PORT',
	'TRAVELOGUE_DB_NAME',
	'TRAVELOGUE_DB_USER',
	'TRAVELOGUE_DB_PASS',
	'TRAVELOGUE_PORT',
].forEach( env => {
	if (!process.env[env]) {
		console.log(`Can't run Travelogue: ${env} not set.`);
		process.exit(1);
	}
});

express()
	.use( bodyParser.json() )
	.use( express.static('backend/static') )
	.use( '/api', api )
	.listen( process.env.TRAVELOGUE_PORT, () => {
		console.log(`Starting Travelogue on port ${process.env.TRAVELOGUE_PORT}.`);
	} );