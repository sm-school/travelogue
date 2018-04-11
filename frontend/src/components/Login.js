import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/components/Login.scss';

const Login = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.userPassword.value;
		props.loginUser(email, password);
	};

	return (
		<div className="login">
			<h1 className="login-title">Log in</h1>
			<form onSubmit={onSubmitHandler} method="post">
				<label htmlFor="email">Email</label>
				<input name="email" type="text" />
				<label htmlFor="userPassword">Password</label>
				<input name="userPassword" type="password" />
				<button type="submit">Log in</button>
			</form>
			<div className="google">
				<div className="login-option">OR</div>
				<a href="api/auth/google"><button>Log in with Google</button></a>
			</div>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func,
};

module.exports = Login;
