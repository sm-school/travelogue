const bcrypt = require('bcrypt');
const salt = 10;
const db = require('../controllers/db');
function hashing(password) {
	return bcrypt.hash(password, salt);
}

const registerUser = (req, res,next) => {
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

const getUserByOauth = (userOauth) => {
	
	return getUserByEmail(userOauth.email).then(function(user){
		console.log('got user');

		return user;
	}).catch(function(err){
	
		return saveUser(userOauth).then(function(user){
	
			console.log('new user registered');
			console.log(user);
			return user;
		}).
		catch(function(err){
	
			console.log(err);
			res.status(400).json(err);
		})

	})

}

function saveUser(user) {
    console.log(user);
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


const sendUserData = (req,res)=>{
	res.status(200).json({email:req.user.email});
}

module.exports={getUserById,getUserByEmail,registerUser,sendUserData, getUserByOauth}