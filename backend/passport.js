'use strict';

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { getUserByEmail, getUserById, getUserByOauth } = require('./controllers/user');

// Local credentials
passport.use(
	new LocalStrategy({
		usernameField: 'email',
	}, (email, password, done) => {
		return getUserByEmail(email)
			.then( user => {
				if (!bcrypt.compareSync(password, user.pass)) {
					return done(null, false);
				} else {
					return done(null, user);
				}
			})
			.catch( err => {
				console.log(err);
				return done(null, false);
			});
	})
);

// Google account credentials
passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/api/auth/google/callback',
	}, (accessToken, refreshToken, profile, done) => {
		let userOauth = userDetailsOauth(profile);

		return getUserByOauth(userOauth)
			.then( user => {
				return done(null, user);
			})
			.catch( err => {
				console.log(err);
				return done(null, false);
			});
	})
);

const userDetailsOauth = (user) => {
	let userOauth = {};

	if (user.provider = 'google') {
		userOauth.id = user.id;
		userOauth.displayName = user.displayName;

		userOauth.gmail_sign_in = 'TRUE';
		userOauth.password = user.id;

		if (user.name != undefined) {
			userOauth.firstName = user.name.givenName;
			userOauth.lastName = user.name.familyName;
		}
		if (user.emails != undefined) {
			userOauth.email = user.emails[0].value;
		}
		if (user.photos != undefined) {
			userOauth.photo = user.photos[0].value;
		}
		if (user._json != undefined) {
			userOauth.domain = user._json.domain;
		}
	}

	return userOauth;
};

passport.serializeUser( (user, done) => {
	done(null, user.id);
});

passport.deserializeUser( (id, done) => {
	getUserById(id)
		.then( user => {
			done(null, user);
		});
});

module.exports = passport;
