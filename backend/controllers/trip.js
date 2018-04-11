'use strict';

const db = require('./db');

// To do: get associated landmarks

function tripImages (tripId) {
	const sql = `
	SELECT i.id, i.s3_id, i.latitude, i.longitude, t.name
	FROM image i, trip t
	WHERE trip_id = $1`;

	return db.any(sql, tripId)
		.then( images => {
			const tripName = images[0].name;

			for (let i = 0; i < images.length; i++) {
				delete images[i].name;
			}

			return {
				id: tripId,
				name: tripName,
				images,
			};
		})
		.catch( error => {
			console.log('Database error:', error.message);
		});
}

module.exports = {
	tripImages,
};
