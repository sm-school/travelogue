import { ADD_IMAGE_URL } from '../constants/action-types';
const uploaderImagesUrl = (state = [],action)=>{
	switch (action.type) {
		case ADD_IMAGE_URL:
			return [ ...state,action.url ];
		default:
			return state;
	}
};

export default uploaderImagesUrl;
