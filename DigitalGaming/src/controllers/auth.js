const path = require('path');

exports.getLogin = (req, res, next) => {
	res.render('users/login');
};

exports.getSignUp = (req, res, next) => {
	res.render('users/register');
};
