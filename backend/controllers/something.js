'use strict';

const pg = require('pg-promise')();

const db = pg({
	host:     'localhost',
	port:     process.env.TRAVELOGUE_DB_PORT,
	database: process.env.TRAVELOGUE_DB_NAME,
	user:     process.env.TRAVELOGUE_DB_USER,
	password: process.env.TRAVELOGUE_DB_PASS,
});

function something (thing) {
	const sql = `
SELECT something
FROM something
WHERE thing = $1`;

	return db.manyOrNone(sql, thing)
		.then( something => {
			return something;
		})
		.catch( error => {
			console.log({ error: error.message });
		});
}

module.exports.something = something;
