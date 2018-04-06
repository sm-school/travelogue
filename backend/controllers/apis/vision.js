'use strict';

const fetch = require('node-fetch');

const api = `https://vision.googleapis.com/v1/images:annotate?fields=responses(faceAnnotations%2FdetectionConfidence%2ClandmarkAnnotations(confidence%2Cdescription%2Clocations%2Cscore%2Ctopicality))&key=${process.env.GOOGLE_CLOUD_API_KEY}`;

const AWS_S3_BUCKET = `https://s3.eu-west-2.amazonaws.com/${process.env.AWS_S3_BUCKET}/`;

function getVisionData (imageId) {
	return imageApiFetch(imageId)
		.then( visionApiResult => extractData(visionApiResult) )
		.catch( error => console.log(`Couldn't extract data: ${error.message}`) );
}

function imageApiFetch (imageId) {
	return fetch(api, fetchRequest(imageId))
		.then( response => { return response.json(); } )
		.then( json => {
			return {
				imageId: imageId,
				data: json,
			};
		})
		.catch( error => console.log(`Couldn't get data: ${error.message}.`) );
}

function extractData (visionApiResult) {
	let data = visionApiResult.data;
	let landmarkData, landmarks, faceConfidence;

	if (data.responses[0].landmarkAnnotations) {
		landmarkData = data.responses[0].landmarkAnnotations;

		landmarks = landmarkData.map( landmark => {
			return {
				name: landmark.description,
				latitude: landmark.locations[0].latLng.latitude,
				longitude: landmark.locations[0].latLng.longitude,
			};
		});
	}

	if (data.faceAnnotations) {
		faceConfidence = data.faceAnnotations[0].detectionConfidence.toFixed(2);
	}

	return {
		imageId: visionApiResult.imageId,
		landmarks: landmarks || [],
		faceConfidence: faceConfidence,
	};
}

function fetchRequest (imageId) {
	return {
		headers: {
			'content-type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(fetchBody(imageId)),
	};
}

function fetchBody (imageId) {
	return {
		requests: [
			{
				features: [
					{
						model: 'builtin/stable',
						type: 'LANDMARK_DETECTION',
						maxResults: 3,
					},
					{
						model: 'builtin/stable',
						type: 'FACE_DETECTION',
					},
				],
				image: {
					source: {
						imageUri: `${AWS_S3_BUCKET}${imageId}`,
					},
				},
			},
		],
	};
}

module.exports = getVisionData;
