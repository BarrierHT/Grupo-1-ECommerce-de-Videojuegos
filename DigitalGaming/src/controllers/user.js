exports.deleteUserByEmail = async (req, res, next) => {
    try {
        const email = req.body.email; // Obtén el correo electrónico del cuerpo de la solicitud

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Elimina el usuario de la base de datos
        await user.destroy();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.updateUserByEmail = async (req, res, next) => {
    try {
        const email = req.body.email; // Obtén el correo electrónico del cuerpo de la solicitud
        const newData = req.body; // Los nuevos datos que quieres actualizar

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Actualiza los campos del usuario con los nuevos datos
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                user[key] = newData[key];
            }
        }

        // Guarda los cambios en la base de datos
        await user.save();

        return res
            .status(200)
            .json({ message: 'User updated successfully', user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
