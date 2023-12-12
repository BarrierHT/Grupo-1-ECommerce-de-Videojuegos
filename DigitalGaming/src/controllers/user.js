const User = require('../app').models.user;

exports.getEmailEditUser = async (req, res, next) => {
	return res.render('users/editEmailUser');
};

exports.getEditUser = async (req, res, next) => {
	try {
		const { email } = req.body;

		// console.log(email);

		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		//console.log(user);

		if (!user) {
			throw new Error('User not found');
		}

		return res.render('users/editUserForm', { userFound: user });
	} catch (error) {
		next(error);
	}
};

exports.deleteUserByEmail = async (req, res, next) => {
	try {
		// console.log('bar DELETING', req.body);

		const email = req.body.email; 

		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		// console.log('bar DELETING', req.body);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// console.log('DELETING ', user);

		// Elimina el usuario de la base de datos
		await user.destroy();

		return res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.updateUserByEmail = async (req, res, next) => {
	try {
		// console.log('foo UPDATING');

		const email = req.body.email; 
		const { name, lastname } = req.body; // Los nuevos datos que quieres actualizar

		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		console.log('UPDATING ', user.dataValues);
		// console.log('UPDATING ', newData);

	
		// for (const key in newData) {
		// 	if (newData.hasOwnProperty(key)) {
		// 		user[key] = newData[key];
		// 	}
		// }

		user['name'] = name;
		user['last_name'] = lastname;

		// Guarda los cambios en la base de datos
		await user.save();

		return res
			.status(200)
			.json({ message: 'User updated successfully', user });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

