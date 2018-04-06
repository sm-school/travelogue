import { UPDATE_USER } from '../constants/action-types';

const user = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return action.user;
		default:
			return state;
	}
};

export default user;
