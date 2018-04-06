'use strict'
const {registerUser, sendUserData} = require('../controllers/user')
const isLoggedIn = require('../helpers/isLoggedIn');
const userRouter = require('express').Router();
const passport = require('../passport');

userRouter.post('/register',registerUser,passport.authenticate('local', { session: true }), sendUserData);
userRouter.post('/login', passport.authenticate('local', { session: true }),sendUserData);

userRouter.get('/email',isLoggedIn,sendUserData)

userRouter.get('/logout', function(req, res){
    // send user info. It should strip password at this stage
    console.log("logged out");
    console.log(req.user);
	req.logout();
	res.redirect('/');
  });




module.exports = userRouter;