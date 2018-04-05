'use strict'
const {registerUser, sendUserData} = require('../controllers/user')
const isLoggedIn = require('../helpers/isLoggedIn');
const userRouter = require('express').Router();
const passport = require('../passport');

userRouter.post('/register',registerUser,passport.authenticate('local', { session: true }), sendUserData);
userRouter.post('/login',passport.authenticate('local', { session: true }),sendUserData)
userRouter.get('/check',isLoggedIn,sendUserData)
module.exports = userRouter;