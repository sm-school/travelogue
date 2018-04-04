import { combineReducers } from 'redux';

import imageLandmarks from './imageLandmarks';
import imageMetadata from './imageMetadata';
import map from './map';

import uploaderImages from './uploadImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import username from './username';
import nextLocation from './nextLocation';

export default combineReducers({
	imageLandmarks,
	imageMetadata,
	map,
	uploaderImages,
	uploaderImagesUrl,
	username,
	nextLocation,
});
