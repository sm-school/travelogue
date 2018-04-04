const authRouter = require('express').Router()
const passport = require('../passport');

authRouter.get('/google',passport.authenticate('google',{scope: ['profile','email','https://www.googleapis.com/auth/user.phonenumbers.read','https://www.googleapis.com/auth/user.birthday.read']}));
authRouter.get('/google/callback', passport.authenticate('google',{failureRedirect: '/login'}),function(req,res){
    res.redirect('/dashboard')
})

module.exports = authRouter;