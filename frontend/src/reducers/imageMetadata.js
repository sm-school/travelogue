import {
	RECEIVE_METADATA,
} from '../constants/action-types';

const imageMetadata = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_METADATA:
			return Object.assign( {}, state, {
				[action.metadata.imageId]: action.metadata,
			} );
		default:
			return state;
	}
};

export default imageMetadata;
