const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
//const users = require('../models/users');

const { validationResult } = require('express-validator');

// Ruta al archivo JSON de productos
// const usersFilePath = path.join(__dirname, '../data/usuarios.json');

//Modelo de datos
const User = require('../app').models.user;

// function readUsersFile() {
// 	const usersData = fs.readFileSync(usersFilePath, 'utf8');
// 	return JSON.parse(usersData);
// }

// function saveUsersToFile(users) {
// 	fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf8');
// }

exports.fileRemove = fileUrl => {
	//Delete a File
	if (fs.existsSync(fileUrl))
		fs.unlink(fileUrl, err => (err ? console.log(err) : ''));
	//Check if a path exists and unlink it
	else console.log('The given path doesnt exist');
};

// let generateID = () => {
// 	return uuidv4();
// };

exports.getLogin = (req, res, next) => {
	res.render('users/login');
};

exports.postLogin = async (req, res, next) => {
	const errors = validationResult(req);
	const { email, password } = req.body;

	// Verifica si hay errores de validación
	if (!errors.isEmpty()) {
		return res.render('users/login', {
			errors: errors.mapped(),
			oldValue: req.body,
		});
	}

	try {
		const existingUser = await User.findOne({
			where: { email: email },
			include: ['rol'],
		});

		// Verifica si el usuario existe
		if (existingUser) {
			const hasMatch = await bcrypt.compare(
				password,
				existingUser.password
			);

			// Verifica si la contraseña coincide
			if (!hasMatch) {
				return res.render('users/login', {
					errors: { password: { msg: 'Contraseña incorrecta' } },
					oldValue: req.body,
				});
			}

			// Inicia sesión almacenando la información del usuario en la sesión
			req.session.user = existingUser;

			console.log(existingUser.rol);
			return res.redirect('/');
		} else {
			return res.render('users/login', {
				errors: { email: { msg: 'Este email no está registrado' } },
				oldValue: req.body,
			});
		}
	} catch (error) {
		// Maneja cualquier error de la base de datos u otros errores
		console.error(error);
		return res.render('users/login', {
			errors: {
				general: {
					msg: 'Hubo un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
				},
			},
			oldValue: req.body,
		});
	}
};

exports.getSignUp = (req, res, next) => {
	res.render('users/register');
};

exports.postSignUp = async (req, res, next) => {
	//Variable con las validaciones
	const resultValidation = validationResult(req);
	//console.log(resultValidation.mapped());

	if (resultValidation.errors.length > 0 || req.file == undefined) {
		console.log('Errors: ', resultValidation.errors.length);

		if (req.file != undefined) {
			this.fileRemove(
				path.join(
					__dirname,
					'..',
					'public',
					'img',
					'users',
					req.file.filename
				)
			);
			console.log('image not uploaded');
		}

		res.render('users/register', {
			errors: resultValidation.mapped(),
			oldValue: req.body,
		});
	} else {
		try {
			// Verificar si un usuario con el mismo correo electrónico ya existe
			//console.log(User);

			const existingUser = await User.findOne({
				where: { email: req.body.email },
			});

			console.log('EL USUARIO YA EXISTE', existingUser);

			if (existingUser) {
				console.log('El usuario ya existe');

				if (req.file != undefined)
					this.fileRemove(
						path.join(
							__dirname,
							'..',
							'public',
							'img',
							'users',
							req.file.filename
						)
					);

				return res.render('users/register', {
					errors: { email: { msg: 'Este email ya está registrado' } },
					oldValue: req.body,
				});
				//   return res.status(400).json({ error: 'El usuario ya existe' });
			}

			// Hashear la contraseña antes de almacenarla
			const hashedPassword = await bcrypt.hash(req.body.password, 12);

			//console.log(req.file);

			// Crear un nuevo usuario en la base de datos
			const newUser = await User.create({
				name: req.body.name,
				last_name: req.body.lastname,
				email: req.body.email,
				user_image: '/img/users/' + req.file.filename,
				password: hashedPassword,
				rol_id: 3,
				//Crear administrador manualmente
			});

			await newUser.save();

			console.log('new User: ', newUser);

			return res.redirect('/login');
		} catch (error) {
			console.error('Error al crear el usuario:', error);

			if (req.file != undefined)
				this.fileRemove(
					path.join(
						__dirname,
						'..',
						'public',
						'img',
						'users',
						req.file.filename
					)
				);

			return res.render('users/register', {
				errors: { msg: 'Un error ocurrio' },
				oldValue: req.body,
			});
		}
	}
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
