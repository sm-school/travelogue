import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/components/Navigation.scss';
import PropTypes from 'prop-types';
import UserMenu from './UserMenu';
const Navigation = (props) => {
	const renderNavLinks = user =>{
		if (Object.keys(user).length !== 0) {
			return (
				<li><UserMenu user={user}/></li>
			);
		} else {
			return [ <li key='login'><NavLink to="/login">Login</NavLink></li>,
				<li key='register'><NavLink to="/register">Register</NavLink></li> ];
		}
	};
	return (<nav className="navigation">
		<div className="navigation_link_wrapper">
			<Link className="navigation__brand" to={Object.keys(props.user).length === 0 ? '/' : '/dashboard'}>Travelogue</Link>
			<ul className="navigation__ul">
				{renderNavLinks(props.user)}
			</ul>
		</div>
	</nav>);
};

Navigation.propTypes = {
	user: PropTypes.object,
};

export default Navigation;
