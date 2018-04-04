import { ADD_IMAGES } from '../constants/action-types';

const uploaderImages = (state = [], action) => {
	switch (action.type) {
		case ADD_IMAGES:
			return [ ...state, ...action.images ];
		default: 
			return state;
	}
};

export default uploaderImages;
