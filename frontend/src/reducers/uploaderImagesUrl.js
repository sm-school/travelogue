import { ADD_IMAGE_URL } from '../constants/action-types';

const addUrlToIndex = (state,url,id) =>{
	const newState = [ ...state ];
	console.log(id);
	newState[id] = url;
	return newState;
};
const uploaderImagesUrl = (state = [],action)=>{
	switch (action.type) {
		case ADD_IMAGE_URL:
			return addUrlToIndex(state,action.url,action.index);
		default:
			return state;
	}
};

export default uploaderImagesUrl;
