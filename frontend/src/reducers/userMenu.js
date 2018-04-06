import { TURN_MENU_ON, TURN_MENU_OFF, TOGGLE_MENU } from '../constants/action-types';


const userMenu = (state = false, action)=>{
	switch (action.type) {
		case TURN_MENU_ON:
			return true;
		case TURN_MENU_OFF:
			return false;
		case TOGGLE_MENU:
			return !state;
		default:
			return state;
	}
};

export default userMenu;
