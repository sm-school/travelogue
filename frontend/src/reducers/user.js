import { SAVE_LOGGED_IN_USER, RESET_USER } from '../constants/action-types';
const initialState = {
	email:'',
	first_name:'',
	display_name:'',
	first_name:'',
	last_name:'',
	photo:'',
	loggedIn:false,
};
const user = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_LOGGED_IN_USER:
			return Object.assign(action.user, { loggedIn:true });
		case RESET_USER:
			return initialState;
		default:
			return state;
	}
};

export default user;
