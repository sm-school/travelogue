function isLoggedIn(req, res, next) {
	if (req.user && req.user.id) {
		next();
	} else {
		res.status(404).end()
	}
}

module.exports= isLoggedIn;