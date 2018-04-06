import { ADD_IMAGES, DELETE_UPLOADER_IMAGE } from '../constants/action-types';

const uploaderImages = (state = [], action) => {
	switch (action.type) {
		case ADD_IMAGES:
			return [ ...state, ...action.images ];
		case DELETE_UPLOADER_IMAGE:
			return state.filter((e, i) => i !== action.index);
		default:
			return state;
	}
};

export default uploaderImages;
