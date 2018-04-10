'use strict';

const db = require('./db');

function tripImages (tripId) {
	const sql = `
	SELECT s3_id, latitude, longitude
	FROM image
	WHERE trip_id = $1`;

	return db.any(sql, userId)
		.then( images => images )
		.catch( error => {
			console.log('Database error:', error.message);
		});
}

function userImages (userId) {
	const sql = `
	SELECT s3_id, latitude, longitude
	FROM image
	WHERE account_id = $1`;

	return db.any(sql, userId)
		.then( images => images )
		.catch( error => {
			console.log('Database error:', error.message);
		});
}

module.exports = {
	userImages,
};
