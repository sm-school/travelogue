'use strict';

const wikipedia = require('./apis/wikipedia');
const vision = require('./apis/vision');

// Test data
// const imageIds = [ 'parliament', 'pisa' ]; // no landmarks: 'dnvb7a'

function imageMetadata (imageIds) {
	vision(imageIds)
		.then ( imageData => {
			let wikiPromises = Object.keys(imageData).map( imageId => {
				const image = imageData[imageId];
				return getWikipediaInfo(image, imageId);
			});

			return Promise.all(wikiPromises)
				.then( wikiData => ({ imageData, wikiData }));
		})
		.then( results => {
			let imageData = results.imageData;
			const wikiData = results.wikiData;

			// Ugly but necessary - we had to include the image ID with each
			// individual landmark item promise returned from getWikipediaInfo,
			// so insert that data at matching array positions for each image
			wikiData.forEach( landmarks => {
				const imageId = landmarks[0].imageId;

				for (let i = 0; i < landmarks.length; i++) {
					imageData[imageId].landmarks[i].page = landmarks[i].wikiData.page;
					imageData[imageId].landmarks[i].extract = landmarks[i].wikiData.extract;
				}
			});

			console.log(JSON.stringify(imageData));
		})
		.catch( error => {
			console.log(error);
		});
}

function getWikipediaInfo (image, imageId) {
	let landmarks = image.landmarks || [];

	let landmarkData = landmarks.map( landmark => {
		return wikipedia(landmark.name)
			.then( wikiData => {
				return {
					imageId: imageId,
					wikiData: wikiData,
				};
			});
	});

	return Promise.all(landmarkData);
}

module.exports = imageMetadata;
