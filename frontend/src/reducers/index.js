import { combineReducers } from 'redux';

import imageLandmarks from './imageLandmarks';
import imageMetadata from './imageMetadata';
import map from './map';
import nextLocation from './nextLocation';
import trip from './trip';
import tripLandmarks from './tripLandmarks';
import uploaderImages from './uploaderImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import user from './user';
import userMenu from './userMenu';

export default combineReducers({
	imageLandmarks,
	imageMetadata,
	map,
	nextLocation,
	trip,
	tripLandmarks,
	uploaderImages,
	uploaderImagesUrl,
	user,
	userMenu,
});
