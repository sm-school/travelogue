import { combineReducers } from 'redux';
import map from './map';

import uploaderImages from './uploadImages';
import uploaderImagesUrl from './uploaderImagesUrl';
import email from './email';
import nextLocation from './nextLocation';

export default combineReducers({
	map,
	uploaderImages,
	uploaderImagesUrl,
	email,
	nextLocation,
});
