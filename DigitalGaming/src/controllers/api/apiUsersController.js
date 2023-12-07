const User = require('../../app').models.user;
//const Rol = require('../../app').models.rol;

exports.getUsers = async (req, res) => {
	try {
		// Obtener la cantidad total de usuarios en la base
		const count = await User.count();

		// Obtener la colección de usuarios con la información requerida
		const users = await User.findAll({
			attributes: ['id', 'name', 'email'],
		});

		// Construir el array con la información requerida
		const usersArray = users.map(user => ({
			id: user.id,
			name: user.name,
			email: user.email,
			detail: `http://localhost:3000/api/users/${user.id}`,
		}));

		// Devolver la respuesta
		res.json({
			count,
			users: usersArray,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Error al obtener la lista de usuarios.',
		});
	}
};

exports.getUserById = async (req, res) => {
	const userId = req.params.id;

	try {
		// Obtener el usuario por ID
		const user = await User.findByPk(userId.toString(), {
			attributes: { exclude: ['password'] }, // Excluir información sensible (password)
			include: ['rol'],
		});

		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado.' });
		}

		//console.log(user.dataValues);

		// Construir el objeto literal con la información requerida
		const userData = {
			id: user.id,
			name: user.name,
			last_name: user.last_name,
			email: user.email,
			rol: user.rol.name,
			user_image: 'http://localhost:3000' + user.user_image,
		};

		// Devolver la respuesta
		res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Error al obtener la información del usuario.',
		});
	}
};
