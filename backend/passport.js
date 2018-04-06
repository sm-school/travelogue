const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {getUserByEmail,getUserById,getUserByOauth} = require('./controllers/user');

// configure passport to use local strategy
// that is use locally stored credentials
passport.use(
	new LocalStrategy({
		usernameField: 'email'
	  }, function(email, password, done) {
		console.log(email,password)
		return getUserByEmail(email)
			.then(function(user) {
				if(!bcrypt.compareSync(password,user.pass)) return done(null, false);
					return done(null, user);
				})
			.catch(function(err) {
				console.log(err);
				return done(null, false);
			});
	})
);

// google passport authentication strategy
passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL:"/api/auth/google/callback"
	}, function(accessToken,refreshToken,profile,done) {
		
		let userOauth = userDetailsOauth(profile);
			return getUserByOauth(userOauth)
				.then(function(user){
				
					console.log('you are in');
					return done(null, user);
				})
				.catch(function(err) {
				
					console.log(err);
					return done(null, false);
				});
			
	}));


const userDetailsOauth = (user) => {
	let userOauth = {};

	if(user.provider = "google") {
		userOauth.id = user.id;
		userOauth.displayName = user.displayName;
	
		userOauth.gmail_sign_in = 'TRUE';
		userOauth.password = user.id;

		if(user.name != undefined){
			userOauth.firstName = user.name.givenName;
			userOauth.lastName = user.name.familyName;
		}
		if(user.emails != undefined){
			userOauth.email = user.emails[0].value;
		}
		if(user.photos != undefined){
			userOauth.photo = user.photos[0].value;
		}
		
		if(user._json != undefined){
			userOauth.domain = user._json.domain;
		}
	}

	return userOauth;
	
}


	// serialise user into session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// deserialise user from session
passport.deserializeUser(function(id, done) {
	getUserById(id).then(function(user) {
		done(null, user);
	});
});



module.exports= passport;