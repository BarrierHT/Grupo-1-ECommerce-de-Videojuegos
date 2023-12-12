exports.isUser = (req, res, next) => {
	//ser usuario

	//console.log(req.session.user.rol);

	if (req.session.user.rol.name != 'Usuario') return res.redirect('/login');
	next();
};
