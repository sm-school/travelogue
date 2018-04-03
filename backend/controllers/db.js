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

function saveLandmarkSuggestions (imageData) {
	let landmarkInserts = imageData.landmarks.map( landmark => {
		return saveLandmark(imageId, landmark)
			.then( landmarkId => {
				return landmarkId;
			});
	});

	return Promise.all(landmarkInserts);
}

function saveLandmark (imageId, landmark) {
	const SQL = `
	INSERT INTO landmark_suggestion
	VALUES( DEFAULT, $1, $2, $3, $4, $5, FALSE )
	RETURNING id;`;

	db.one(sql, [
		imageId,
		landmark.name,
		landmark.latitude,
		landmark.longitude,
		landmark.page,
		landmark.extract,
	])
		.then( id => {
			return id;
		})
		.catch( error => {
			console.log(error);
		});
}

module.exports = db;
