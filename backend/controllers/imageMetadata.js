'use strict';

const getWikipediaData = require('./apis/wikipedia.js');
const getVisionData = require('./apis/vision.js');

// Test data: 'parliament', 'pisa', no landmarks: 'dnvb7a'

function imageMetadata (imageId) {
	return getVisionData(imageId)
		.then ( imageData => {
			return getLandmarks(imageData)
				.then( wikiData => {
					wikiData.forEach( landmark => {
						for (let i = 0; i < wikiData.length; i++) {
							imageData.landmarks[i].page = wikiData[i].page;
							imageData.landmarks[i].extract = wikiData[i].extract;
						}
					});

					return imageData;
				});
		})
		.catch( error => {
			console.log(error);
		});
}

function getLandmarks (image) {
	let landmarks = image.landmarks || [];

	let landmarkData = image.landmarks.map( landmark => {
		return getWikipediaData(landmark.name)
			.then( wikiData => {
				return wikiData;
			});
	});

	return Promise.all(landmarkData);
}

module.exports = imageMetadata;
