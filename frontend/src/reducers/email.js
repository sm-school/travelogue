import { SAVE_EMAIL } from '../constants/action-types';
const email = (state = '',action)=>{
	switch (action.type) {
		case SAVE_EMAIL:
			return action.email;
		default:
			return state;
	}
};

export default email;
