import { RECEIVE_TRIP_LANDMARKS } from '../constants/action-types';

const receiveTripLandmarks = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_TRIP_LANDMARKS:
			return action.landmarks;
		default:
			return state;
	}
};

export default receiveTripLandmarks;
