import { combineReducers } from 'redux';

import imageLandmarks from './imageLandmarks';
import imageMetadata from './imageMetadata';
import map from './map';

import userMenu from './userMenu';
import uploaderImages from './uploaderImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import nextLocation from './nextLocation';
import tripInfo from './tripSummary';
import user from './user';
export default combineReducers({
	userMenu,
	imageLandmarks,
	imageMetadata,
	map,
	uploaderImages,
	uploaderImagesUrl,
	nextLocation,
	user,
	tripInfo,
});
