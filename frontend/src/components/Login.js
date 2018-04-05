import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes  from 'prop-types';

import '../styles/components/Login.scss';

const Login = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const username = e.target.userName.value;
		const password = e.target.userPassword.value;
		props.loginUser(username, password);
	};
	return (
		<div className="login">
			<form onSubmit={onSubmitHandler}  method="POST">
				<label htmlFor="userName">Username</label>
				<input name="userName" type='text' />
				<label htmlFor="userPassword">Password</label>
				<input name="userPassword" type='password' />
				<button type="submit">Login</button>
			</form>
			<div className="login-google">
				Or, <a href='api/auth/google'><button>log in with your Google account</button></a>
			</div>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func,
};

module.exports = Login;
