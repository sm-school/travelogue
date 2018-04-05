import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes  from 'prop-types';

const Login = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.userPassword.value;
		props.loginUser(email, password);
	};
	return (
		<div>
			<form onSubmit={onSubmitHandler}  method="POST">
				<label htmlFor="email">Email:</label>
				<input name="email" type='text' />
				<label htmlFor="userPassword">User Password:</label>
				<input name="userPassword" type='password' />
				<button type="submit">Login</button>
			</form>
			<Link to="/register"> <button>Register</button></Link>
			<a href='api/auth/google'>Login with google</a>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func,
};

module.exports = Login;
