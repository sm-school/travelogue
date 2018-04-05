function isLoggedInWithRedirect (req, res, next) {
	if (req.user && req.user.id) {
		next();
	} else {
		res.redirect('/login?ref=' + req.originalUrl);
	}
}

module.exports = isLoggedInWithRedirect;
