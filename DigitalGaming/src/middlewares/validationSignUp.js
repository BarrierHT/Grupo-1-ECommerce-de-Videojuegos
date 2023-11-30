const { body } = require('express-validator');

const arrRegisterValidation = [
	body('lastname')
		.trim()
		.notEmpty()
		.withMessage('El apellido no puede estar vacío')
		.isLength({ min: 2 })
		.withMessage('El apellido debe tener al menos 2 caracteres')
		.isAlpha()
		.withMessage('El apellido no puede contener números')
		.custom(value => !/\s/.test(value))
		.withMessage('El apellido no puede contener espacios')
		.isLength({ max: 15 })
		.withMessage('El apellido debe tener como máximo 15 caracteres'),

	body('name')
		.trim()
		.notEmpty()
		.withMessage('El nombre no puede estar vacío')
		.isLength({ min: 2 })
		.withMessage('El nombre debe tener al menos 2 caracteres')
		.isAlpha()
		.withMessage('El nombre no puede contener números')
		.custom(value => !/\s/.test(value))
		.withMessage('El nombre no puede contener espacios')
		.isLength({ max: 15 })
		.withMessage('El nombre debe tener como máximo 15 caracteres'),

	body('email')
		.trim()
		.notEmpty()
		.withMessage('El correo electrónico no puede estar vacío')
		.isEmail()
		.withMessage('Debe proporcionar un correo electrónico válido'),

	body('imagen').custom((value, { req }) => {
		if (!req.file) {
			throw new Error('Debe seleccionar un archivo de imagen válido.');
		}

		const maxFileSize = 2 * 1024 * 1024;
		if (
			req.file.size <= 0 ||
			req.file.size > maxFileSize || // Asegurar que el tamaño sea menor o igual a 2 MB
			!['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'].includes(
				req.file.mimetype
			)
		) {
			throw new Error(
				'El archivo de imagen no cumple con los requisitos.'
			);
		}

		return true;
	}),

	body('password')
		.trim()
		.notEmpty()
		.withMessage('La contraseña no puede estar vacía')
		.isLength({ min: 8 })
		.withMessage('La contraseña debe tener al menos 8 caracteres')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
		.withMessage(
			'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
		),

	body('password2')
		.trim()
		.notEmpty()
		.withMessage('La confirmación de contraseña no puede estar vacía')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
		}),
];

module.exports = arrRegisterValidation;
