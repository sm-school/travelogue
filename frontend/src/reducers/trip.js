import { RECEIVE_TRIP } from '../constants/action-types';

const receiveTrip = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_TRIP:
			return action.trip;
		default:
			return state;
	}
};

export default receiveTrip;
