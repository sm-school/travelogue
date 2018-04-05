import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes  from 'prop-types';

const Login = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const username = e.target.userName.value;
		const password = e.target.userPassword.value;
		props.loginUser(username, password);
	};
	return (
		<div>
			<form onSubmit={onSubmitHandler}  method="POST">
				<label htmlFor="userName">User Name:</label>
				<input name="userName" type='text' />
				<label htmlFor="userPassword">User Password:</label>
				<input name="userPassword" type='password' />
				<button type="submit">Login</button>
			</form>
			<a href='api/auth/google'><button>Login with google</button></a>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func,
};

module.exports = Login;
