import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = (props) => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.userPassword.value;
		props.registerUser(email, password);
	};
	return (
		<div>
			<form onSubmit={onSubmitHandler} action="/login" method="POST">
				<label htmlFor="email">Email:</label>
				<input name="email" type='text' />
				<label htmlFor="userPassword">User Password:</label>
				<input name="userPassword" type='password' />
				<button type="submit">Register</button>
			</form>
			<Link to="/login"> <button>Login</button></Link>
		</div>
	);
};

Register.propTypes = {
	registerUser: PropTypes.func,
};

module.exports = Register;

