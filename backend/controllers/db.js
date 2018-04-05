'use strict';

const pg = require('pg-promise')();
const backendConfig = require('../configs/backend');

const db = pg(backendConfig.DB_URL);

db.connect()
	.then(obj => {
		obj.done();
	})
	.catch(error => {
		console.log('Database connection error:', error.message);
		process.exit(1);
	});

module.exports = db;
