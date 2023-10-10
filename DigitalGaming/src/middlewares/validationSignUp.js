const { body } = require('express-validator');

const validationsSingUp = [
  body('lastname')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío')
    .bail()
    .isAlpha()
    .withMessage('El apellido no puede contener números')
    .bail()
    .custom((value) => !/\s/.test(value))
    .withMessage('El apellido no puede contener espacios')
    .bail()
    .isLength({ max: 15 })
    .withMessage('El apellido debe tener como máximo 15 caracteres')
    .bail(),
  body('username')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .bail()
    .isAlpha()
    .withMessage('El nombre no puede contener números')
    .bail()
    .custom((value) => !/\s/.test(value))
    .withMessage('El nombre no puede contener espacios')
    .bail()
    .isLength({ max: 15 })
    .withMessage('El nombre debe tener como máximo 15 caracteres')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico no puede estar vacío')
    .bail()
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido'),
  body('imagen').custom((value, { req }) => {
    // Comprobar si multer ya ha rechazado el archivo
    if (!req.file) {
      throw new Error('Debe seleccionar un archivo de imagen válido.');
    }
    return true;
  }),
  body('password')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
    ),
  body('password2')
    .notEmpty()
    .withMessage('La confirmación de contraseña no puede estar vacía')
    .bail()
    .custom((value, { req }) => {
      // Compara el campo "password" con el campo "password2"
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),
];

module.exports = validationsSingUp;
