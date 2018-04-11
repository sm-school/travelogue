import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/components/UserMenu.scss';
const UserMenu = props=> {
	
	const onClickHandler = e => {
		console.log('ss');
		e.stopPropagation();
		props.toggleMenu();
	};

	const renderPopUp = open => {
		if (open) {
			return <div className="usermenu__popup">
				< Link to='/trip/1'><div>Trip</div></Link>
				< Link to='/profile'><div>Profile</div></Link>
				< Link to='#'><div onClick={e =>{e.stopPropagation(); props.logoutUser();}}>LogOut</div></Link>
			</div>;
		} else {
			return null;
		}
	};

	return (<div className="usermenu">
		<div className="usermenu__avatar__wrapper" onClick={onClickHandler}><img src={props.user.photo} /></div>
		{renderPopUp(props.userMenu)}
	</div>
	);

};

UserMenu.propTypes = {
	user: PropTypes.object,
	logoutUser: PropTypes.func,
	toggleMenu: PropTypes.func,
	userMenu: PropTypes.bool,
};

export default UserMenu;
