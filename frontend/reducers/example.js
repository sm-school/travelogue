import {
	UPDATE_EXAMPLE,
} from '../actions/types';

const example = (state = [], action) => {
	switch (action.type) {
		case UPDATE_EXAMPLE:
			return action.example;
		default:
			return state;
	}
};

export default example;
