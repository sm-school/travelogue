'use strict';

const getWikipediaData = require('./apis/wikipedia.js');
const getVisionData = require('./apis/vision.js');

function fetchMetadata (imageId) {
	let imageData;

	return getVisionData(imageId)
		.then( visionData => {
			imageData = JSON.parse(JSON.stringify(visionData));
			return getLandmarks(visionData);
		})
		.then( wikiData => {
			wikiData.forEach( landmark => {
				for (let i = 0; i < wikiData.length; i++) {
					imageData.landmarks[i].page = wikiData[i].page;
					imageData.landmarks[i].extract = wikiData[i].extract;
				}
			});

			return imageData || {};
		})
		.catch( error => console.log(error) );
}

function getLandmarks (imageData) {
	let landmarks = imageData.landmarks || [];

	return Promise.all(
		landmarks.map( landmark => getWikipediaData(landmark.name) )
	);
}

module.exports = fetchMetadata;
