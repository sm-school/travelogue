const bcrypt = require('bcrypt');

const db = require('../controllers/db');

const salt = 10;

function hashing (password) {
	return bcrypt.hash(password, salt);
}

const registerUser = (req, res,next) => {
	saveUser(req.body)
		.then( _d => {
			next();
		})
		.catch( error => {
			console.log(error);
			res.status(400).json(error);
		});
}

// helper function to work with user

const getUserByOauth = (userOauth) => {
	
	return getUserByEmail(userOauth.email).then(function(user){
		return user;
	}).catch(function(err){
	
		return saveUser(userOauth).then(function(user){
			return user;
		}).
		catch(function(err){
			console.log(err);
			res.status(400).json(err);
		})

	})

}

function saveUser(user) {
	return hashing(user.password).then(function(hash) {
		return db.one('INSERT INTO account (email, pass, gmail_sign_in, display_name, first_name, last_name, photo, domain_name) VALUES ($1,$2, $3, $4, $5, $6, $7, $8) RETURNING *', [user.email, hash, user.gmail_sign_in, user.displayName, user.firstName,  user.lastName,   user.photo, user.domain]);
	});
}

const getUserByEmail = (email) => {
	return db.one('SELECT * FROM account WHERE email = $1', [email]);
}

const getUserById = id => {
	return db.one('SELECT * FROM account WHERE id = $1', [id]);
}

const sendUserData = (req, res) => {
	const user = req.user;
	delete user['id'];
	delete user['pass']
	
	res.status(200).json({ ...user });
};

module.exports = { getUserById, getUserByEmail, registerUser, sendUserData,getUserByOauth };
