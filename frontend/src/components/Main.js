import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Main = (props)=> {
	return (
		<div>
			<nav className="navbar">
				<div className="navbar-header">
					<Link className="navbar-brand" to="/">Travelogue</Link>
				</div>
						
				<ul className="navbar-link">
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/login">Login</NavLink></li>
					<li><NavLink to="/register">Register</NavLink></li>
					<li><NavLink to="/logout">Log Out </NavLink></li>
				</ul>
					
			</nav>
			<div className="container">
				{props.children}
			</div>
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.array,
};
export default Main;
