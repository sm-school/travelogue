import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/components/Register.scss';

const Register = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.userPassword.value;
		props.registerUser(email, password);
	};
	return (
		<div className="register">
			<h1>Get a Travelogue account</h1>
			<form onSubmit={onSubmitHandler} action="/login" method="post">
				<label htmlFor="email">Email</label>
				<input name="email" type="text" />
				<label htmlFor="userPassword">Password</label>
				<input name="userPassword" type="password" />
				<button type="submit">Sign up!</button>
			</form>
		</div>
	);
};

Register.propTypes = {
	registerUser: PropTypes.func,
};

module.exports = Register;

