import React from 'react';
import '../styles/components/Profile.scss';
const NotFound = (profile) => {
	return (
		<div className='profile'>
			<h1 className='profile-title'>Profile</h1>
			<form>
				<label htmlFor="email">Email</label>
				<input name="email" type="text" />
				<label htmlFor="userPassword">Password</label>
				<input name="userPassword" type="password" />
				<label htmlFor="userPassword">Password Confirmation</label>
				<input name="userPassword" type="password" />
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

module.exports = NotFound;
