const bcrypt = require('bcrypt');

const db = require('../controllers/db');

const salt = 10;

function hashing (password) {
	return bcrypt.hash(password, salt);
}

function registerUser (req, res, next) {
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

function saveUser (user) {
	console.log(user);
	return hashing(user.password)
		.then( hash => {
			return db.none(
				'INSERT INTO account (username, pass) VALUES ($1,$2)',
				[ user.username, hash ]
			);
		});
}

function getUserByUsername (username) {
	return db.one(
		'SELECT * FROM account WHERE username = $1',
		[ username ]
	);
}

function getUserById (id) {
	return db.one(
		'SELECT * FROM account WHERE id = $1',
		[ id ]
	);
}

const sendUserData = (req, res) => {
	res.status(200).json({ user: { username:req.user.username } });
};

module.exports = { getUserById, getUserByUsername, registerUser, sendUserData };
