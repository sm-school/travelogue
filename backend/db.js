'use strict';

const pg = require('pg-promise')();
const env = require('./env');

export const db = pg({
	host:     env.HOST,
	port:     env.DB_PORT,
	database: env.DB_NAME,
	user:     env.DB_USER,
	password: env.DB_PASS,
});


