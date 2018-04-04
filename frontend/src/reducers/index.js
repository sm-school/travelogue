import { combineReducers } from 'redux';
import map from './map';

import uploaderImages from './uploadImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import username from './username';
import nextLocation from './nextLocation';

export default combineReducers({
	map,
	uploaderImages,
	uploaderImagesUrl,
	username,
	nextLocation,
});
