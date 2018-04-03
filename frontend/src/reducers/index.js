import { combineReducers } from 'redux';

import imageMetadata from './imageMetadata';
import map from './map';

export default combineReducers({
	imageMetadata,
	map,
});
