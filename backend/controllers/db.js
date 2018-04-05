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

function imageMetadata (imageId) {
	const sql = `
	SELECT i.latitude, i.longitude
	FROM image i
	WHERE i.s3_id = $1`;

	return db.any(sql, imageId)
		.then( metadata => {
			return {
				imageId: imageId,
				latitude: metadata[0].latitude,
				longitude: metadata[0].longitude,
			};
		})
		.catch( error => {
			console.log('Database error:', error.message);
		});
}

function imageLandmarks (imageId) {
	const sql = `
	SELECT l.name, l.latitude, l.longitude, l.page, l.extract
	FROM image i, landmark l
	WHERE i.id = l.image_id
	AND i.s3_id=$1;`;

	return db.any(sql, imageId)
		.then( landmarks => {
			return {
				imageId: imageId,
				landmarks: landmarks,
			};
		})
		.catch( error => {
			console.log('Database error:', error.message);
		});
}

function saveLandmarkSuggestions (imageData) {
	let landmarkInserts = imageData.landmarks.map( landmark => {
		return saveLandmark(imageId, landmark)
			.then( landmarkId => {
				return landmarkId;
			});
	});

	return Promise.all(landmarkInserts);
}

// Not used yet

// function saveLandmark (imageId, landmark) {
// 	const sql = `
// 	INSERT INTO landmark_suggestion
// 	VALUES( DEFAULT, $1, $2, $3, $4, $5, FALSE )
// 	RETURNING id;`;

// 	db.one(sql, [
// 		imageId,
// 		landmark.name,
// 		landmark.latitude,
// 		landmark.longitude,
// 		landmark.page,
// 		landmark.extract,
// 	])
// 		.then( id => {
// 			return id;
// 		})
// 		.catch( error => {
// 			console.log('Database error:', error.message);
// 		});
// }

function storeImage ( { user, imageData } ) {
	console.log(user, imageData);
	const s3_id = imageData.fileName;
	const accountId = user.id;

	const sql = `
	INSERT INTO image
	VALUES( DEFAULT, $1, $2, $3, $4 )
	RETURNING s3_id;`;

	// undefined values standing in for lat and long currently
	return db.one(sql, [ s3_id, undefined, undefined, accountId ])
		.then( uploaded_s3_id => {
			return uploaded_s3_id;
		})
		.catch( error => {
			console.log('Database error while uploading image', s3_id, ':', error.message);
		});
}

module.exports.db = db;
module.exports.imageLandmarks = imageLandmarks;
module.exports.imageMetadata = imageMetadata;
module.exports.storeImage = storeImage;
