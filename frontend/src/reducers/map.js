import {
	UPDATE_LATITUDE,
	UPDATE_LONGITUDE,
	UPDATE_ZOOM,
} from '../constants/action-types';

const map = (state = {
	latitude: 51.5261053,
	longitude: -0.0834954,
	zoom: 18,
}, action) => {
	switch (action.type) {
		case UPDATE_LATITUDE:
			return Object.assign( {}, state, {
				latitude: action.latitude,
			} );
		case UPDATE_LONGITUDE:
			return Object.assign( {}, state, {
				longitude: action.longitude,
			} );
		case UPDATE_ZOOM:
			return Object.assign( {}, state, {
				zoom: action.zoom,
			} );
		default:
			return state;
	}
};

export default map;
