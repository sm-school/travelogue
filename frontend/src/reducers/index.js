import { combineReducers } from 'redux';
import map from './map';

import uploaderImages from './uploadImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import nextLocation from './nextLocation';
import user from './user';
export default combineReducers({
	map,
	uploaderImages,
	uploaderImagesUrl,
	nextLocation,
	user,
});
