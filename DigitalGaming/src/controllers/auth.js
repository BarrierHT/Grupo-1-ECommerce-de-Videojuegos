const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON de productos
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

function readUsersFile() {
	const usersData = fs.readFileSync(usersFilePath, 'utf8');
	return JSON.parse(usersData);
}

exports.getLogin = (req, res, next) => {
	res.render('users/login');
};

exports.postLogin = (req, res, next) => {
	const { email, password } = req.body;

	console.log('login: ', email, ' ', password);

	const usersData = readUsersFile();

	// Verifica las credenciales del usuario
	const user = usersData.find(
		user => user.email == email && user.password == password
	);

	console.log(user);

	if (user) {
		// Iniciar sesión almacenando la información del usuario en la sesión
		req.session.user = user;

		// Redirigir a la página de perfil o a la home
		res.redirect('/'); // Reemplaza con la ruta correcta
	} else {
		// Si las credenciales son incorrectas, redirigir al login nuevamente
		res.redirect('/login');
	}
};

exports.getSignUp = (req, res, next) => {
	res.render('users/register');
};

exports.getLogout = (req, res, next) => {
	try {
		//if (req.session.user._id.toString() == req.user._id.toString()) {
		req.session.destroy(err => {
			if (err) throw new Error('session error');
			res.redirect('/');
		});
		//}
	} catch (error) {
		next(error);
	}
};
