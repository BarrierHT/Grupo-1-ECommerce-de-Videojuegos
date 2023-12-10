exports.isAdmin = (req, res, next) => {
	//Need to be admin

	console.log(req.session.user.rol);

	if (req.session.user.rol.name != 'Administrador')
		return res.redirect('/login');
	next();
};
