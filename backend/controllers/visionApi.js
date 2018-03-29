'use strict';

const fetch = require('node-fetch');

const GOOGLE_CLOUD_API_KEY = 'AIzaSyBIJwMg9nB14VrfKpVhUtIQIovRlXJKB3M';
const api = `https://vision.googleapis.com/v1/images:annotate?fields=responses(faceAnnotations%2FdetectionConfidence%2ClandmarkAnnotations(confidence%2Cdescription%2Clocations%2Cscore%2Ctopicality))&key=${GOOGLE_CLOUD_API_KEY}`;

const S3_BUCKET = 'https://s3.us-east-2.amazonaws.com/traveluploader/'; // 'http://travelogue-test.s3-website.eu-west-2.amazonaws.com/';

const imageIds = [ 'bigben', 'parliament', 'dnvb7a' ];

processImageQueue(imageIds)
	.then ( imageData => {
		console.log(JSON.stringify(imageData));
	});

// ---------------------------------------------------------------------------

function processImageQueue (imageQueue) {
	let visionApiResults = {};

	const fetchPromises = imageQueue.map( imageId => {
		return imageApiFetch(imageId);
	});

	return Promise.all(fetchPromises)
		.then( results => {
			results.forEach( item => {
				visionApiResults[item.imageId] = item.data;
			});

			return extractData(visionApiResults);
		})
		.catch( error => {
			console.log(error);
		});
}

function extractData (visionApiResults) {
	const imageIds = Object.keys(visionApiResults);

	const imageData = imageIds.reduce( (acc, imageId) => {
		const visionResponses = visionApiResults[imageId].responses[0];
		let landmarkData, landmarks, faceConfidence;

		if (visionResponses.landmarkAnnotations) {
			landmarkData = visionResponses.landmarkAnnotations;

			landmarks = landmarkData.map( landmark => {
				return {
					name: landmark.description,
					latitude: landmark.locations[0].latLng.latitude,
					longitude: landmark.locations[0].latLng.longitude,
				};
			});
		}

		if (visionResponses.faceAnnotations) {
			faceConfidence = visionResponses.faceAnnotations[0].detectionConfidence.toFixed(2);
		}

		acc[imageId] = {
			landmarks: landmarks,
			faceConfidence: faceConfidence,
		};

		return acc;
	}, {} );

	return imageData;
}

function imageApiFetch (imageId) {
	return fetch(api, fetchRequest(imageId))
		.then( response => {
			return response.json();
		})
		.then( json => {
			return {
				imageId: imageId,
				data: json,
			};
		})
		.catch( error => {
			console.log(`Couldn't get data: ${error}.`);
		});
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
						imageUri: `${S3_BUCKET}${imageId}.jpg`,
					},
				},
			},
		],
	};
}
