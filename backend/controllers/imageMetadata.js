'use strict';

const wikipedia = require('../backend/controllers/apis/wikipedia');
const vision = require('../backend/controllers/apis/vision');

const imageIds = [ 'parliament', 'pisa' ]; // no landmarks: 'dnvb7a'

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

		wikiData.forEach( imageLocations => {
			const imageId = imageLocations[0].imageId;
			console.log(imageId, imageLocations.length);

			for (let i = 0; i < imageLocations.length; i++) {
				imageData[imageId].landmarks[i].page = imageLocations[i].wikiData.page;
				imageData[imageId].landmarks[i].extract = imageLocations[i].wikiData.extract;
			}
		});

		console.log(JSON.stringify(imageData));
	})
	.catch( error => {
		console.log(error);
	});


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

