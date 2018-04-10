import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserMenuContainer from '../containers/UserMenuContainer';

import '../styles/components/Navigation.scss';

class Navigation extends React.Component {
	componentDidMount() {
		window.addEventListener('click', this.props.turnMenuOff);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.props.turnMenuOff);
	}

	renderNavLinks = user =>{
		if (user.loggedIn) {
			return ( <li key="usermenu"><UserMenuContainer/></li> );
		} else {
			return [
				<li key="login"><NavLink to="/login">Log in</NavLink></li>,
				<li key="register"><NavLink to="/register">Sign up</NavLink></li>,
			];
		}
    
	};

	render() {
		return (
			<nav className="navigation">
				<div className="navigation_link_wrapper">
					<Link className="navigation__brand" to={
						this.props.user.loggedIn ? '/dashboard' : '/'
					}>Travelogue</Link>
					<ul className="navigation__ul">
						{this.renderNavLinks(this.props.user)}
					</ul>
				</div>
			</nav>
		);
	}
};

Navigation.propTypes = {
	user: PropTypes.object,
	turnMenuOff: PropTypes.func,
};

export default Navigation;
