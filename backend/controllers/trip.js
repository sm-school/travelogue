'use strict';

const db = require('./db');

// To do: replace this with tripImages

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
