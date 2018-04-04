import {
	RECEIVE_LATITUDE,
	RECEIVE_LONGITUDE,
	RECEIVE_POINT,
	RECEIVE_ZOOM,
} from '../constants/action-types';

const map = (state = {
	latitude: undefined,
	longitude: undefined,
	zoom: 15,
}, action) => {
	switch (action.type) {
		case RECEIVE_LATITUDE:
			return Object.assign( {}, state, {
				latitude: action.latitude,
			} );
		case RECEIVE_LONGITUDE:
			return Object.assign( {}, state, {
				longitude: action.longitude,
			} );
		case RECEIVE_POINT:
			return Object.assign({}, state, {
				points: [
			 		...state.points,
					{
						latitude: action.latitude,
						longitude: action.longitude,
						title: action.title,
					},
				],
			} );
		case RECEIVE_ZOOM:
			return Object.assign( {}, state, {
				zoom: action.zoom,
			} );
		default:
			return state;
	}
};

export default map;
