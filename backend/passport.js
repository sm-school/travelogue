const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {getUserByUsername,getUserById} = require('./controllers/user');

// configure passport to use local strategy
// that is use locally stored credentials
passport.use(
	new LocalStrategy(function(username, password, done) {
        console.log(username,password)
		return getUserByUsername(username)
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
	},
	function(accessToken,refreshToken,profile,cb){
		console.log(profile)
		// User.findOrCreate({googleId: profile.id}),function(err,user){
		// 	return cb(err,user);
		// }
	}
)
)

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