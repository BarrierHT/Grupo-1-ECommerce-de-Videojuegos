exports.isAuth = (req, res, next) => {
	//Need to be logged
	if (!req.session.user) return res.redirect('/login');
	next();
};

exports.isNotAuth = (req, res, next) => {
	//Need to be unlogged
	if (req.session.user) return res.redirect('/');
	next();
};
