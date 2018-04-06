import React from 'react';
import PropTypes from 'prop-types';

const UserMenu = props =>{
	return (<h1>{props.user.username}</h1>);
};

UserMenu.propTypes = {
	user: PropTypes.object,
};

export default UserMenu;
