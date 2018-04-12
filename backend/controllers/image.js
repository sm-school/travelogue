'use strict';

const db = require('./db');

function imageMetadata (imageId) {
	console.log('Getting metadata:', imageId);
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

function storeImage ( { user, imageData } ) {
	const s3_id = imageData.fileName;
	console.log('Storing', s3_id, 'for', user.username);
	const accountId = user.id;

	const tripId = 2; // until we build feature

	const sql = `
	INSERT INTO image
	VALUES( DEFAULT, $1, $2, $3, $4, $5 )
	RETURNING s3_id;`;

	// undefined values standing in for lat and long currently
	return db.one(sql, [ s3_id, undefined, undefined, accountId, tripId ])
		.then( uploaded_s3_id => {
			return uploaded_s3_id;
		})
		.catch( error => {
			console.log('Database error while uploading image', s3_id, ':', error.message);
		});
}

function storeLandmarks (imageData) {
	console.log(imageData);
	const s3_id = imageData.imageId;
	const landmarks = imageData.landmarks;
	// console.log('Storing landmarks:', landmarks);

	const getImageId = `
	SELECT id
	FROM image
	WHERE s3_id=$1;`;

	const saveLandmark = `
	INSERT INTO landmark
	VALUES( DEFAULT, $1, $2, $3, $4, $5, $6, FALSE )
	RETURNING id;`;

	let landmarkInserts = landmarks.map( landmark => {
		db.one(getImageId, s3_id)
			.then( imageDbId => {
				return db.one(saveLandmark, [
					imageDbId.id,
					landmark.name,
					landmark.latitude,
					landmark.longitude,
					landmark.page,
					landmark.extract,
				]);
			})
			.then( id => id )
			.catch( error => console.log('Database error storing landmark:', error.message) );
	});

	return Promise.all(landmarkInserts);
}

module.exports = {
	imageLandmarks,
	imageMetadata,
	storeImage,
	storeLandmarks,
};
