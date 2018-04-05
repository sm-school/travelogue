const bcrypt = require('bcrypt');
const salt = 10;
const db = require('../controllers/db');
function hashing(password) {
	return bcrypt.hash(password, salt);
}

function registerUser(req, res,next) {
	saveUser(req.body)
		.then(function(_d) {
			next();
		})
		.catch(function(err) {
            console.log(err);
			res.status(400).json(err);
		});
}
// helper function to work with user

function saveUser(user) {
    console.log(user);
	return hashing(user.password).then(function(hash) {
		if(user.gmail_sign_in != undefined) {
			user.gmail_sign_in = false
		 } else {
			user.gmail_sign_in = true;
			user.password = 'N/a';
		};
		debugger;
		console.log(user)

		return db.none('INSERT INTO account (email, pass, gmail_sign_in) VALUES ($1,$2,$3)', [user.email, hash, user.gmail_sign_in]);
	});
}

function getUserByEmail(email) {
	return db.one('SELECT * FROM account WHERE email = $1', [email]);
}

function getUserById(id) {
	return db.one('SELECT * FROM account WHERE id = $1', [id]);
}


const sendUserData = (req,res)=>{
	res.status(200).json({email:req.user.email});
}

module.exports={getUserById,getUserByEmail,registerUser,sendUserData}