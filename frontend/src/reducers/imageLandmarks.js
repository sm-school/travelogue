import {
	RECEIVE_LANDMARKS,
} from '../constants/action-types';

const imageLandmarks = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_LANDMARKS:
			return Object.assign( {}, state, {
				[action.landmarks.imageId]: action.landmarks,
			} );
		default:
			return state;
	}
};

export default imageLandmarks;
