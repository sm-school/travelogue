import { combineReducers } from 'redux';
import map from './map';
import uploaderImages from './uploadImages';
import uploaderImagesUrl from './uploaderImagesUrl';
export default combineReducers({
	map,
	uploaderImages,
	uploaderImagesUrl,
});
