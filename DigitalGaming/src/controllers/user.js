//Modelo de datos
const User = require('../app').models.user;

// Buscar un usuario por correo electrónico
exports.getUserByEmail = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ user });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
