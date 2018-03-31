'use strict';

const pg = require('pg-promise')();
const env = require('../configs/env');

const db = pg(env.DB_URL);

db.connect()
	.then(obj => {
		obj.done();
	})
	.catch(error => {
		console.log(error.message || error);
	});

function metadataRequired (userId) {
	const sql = `
	SELECT s3_id FROM images
	WHERE user_id = $1
	AND metadata_required = TRUE`;

	return db.any(sql, userId)
		.then( data => {
			return data;
		})
		.catch( error => {
			console.log({ error: error.message });
		});
}

module.exports = db;
