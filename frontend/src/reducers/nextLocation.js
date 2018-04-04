import { UPDATE_NEXT_LOCATION } from '../constants/action-types';

const nextLocation = (state = '', action) => {
	switch (action.type) {
		case UPDATE_NEXT_LOCATION:
			return action.nextLocation;
		default:
			return state;
	}
};

export default nextLocation;
