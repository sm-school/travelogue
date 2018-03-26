import {
	UPDATE_EXAMPLE,
} from './types';

export const updateExample = example => {
	return {
		type: UPDATE_EXAMPLE,
		example,
	};
};