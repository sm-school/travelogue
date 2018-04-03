import {
	ACCEPT_LANDMARK,
	RECEIVE_METADATA,
} from '../constants/action-types';

const imageMetadata = (state = {}, action) => {
	switch (action.type) {
		// case ACCEPT_LANDMARK:
		// 	return Object.assign( {}, state, {
		// 		landmarkId: action.landmarkId, // no no no
		// 	} );
		case RECEIVE_METADATA:
			return Object.assign( {}, state, {
				[action.metadata.imageId]: action.metadata,
			} );
		default:
			return state;
	}
};

export default imageMetadata;
