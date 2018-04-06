import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/UserMenu.scss';
const UserMenu = props =>{
	return (<div className="usermenu__avatar__wrapper"><img  src={props.user.photo}/></div>);
};

UserMenu.propTypes = {
	user: PropTypes.object,
};

export default UserMenu;
