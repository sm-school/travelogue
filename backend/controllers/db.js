'use strict';

const pg = require('pg-promise')();
const backendConfig = require('../configs/backend');

const db = pg(backendConfig.DB_URL);

db.connect()
	.then(obj => {
		obj.done();
	})
	.catch(error => {
		console.log('Database error:', error.message);
		process.exit(1);
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
