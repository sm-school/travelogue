import { combineReducers } from 'redux';
import map from './map';
import username from './username';
import nextLocation from './nextLocation';
export default combineReducers({
	map,
	username,
	nextLocation,
});
