const { body, validationResult } = require('express-validator');

const validationProduct = [
  body('nombre')
    .notEmpty()
    .withMessage('Este campo es obligatorio')
    .bail()
    .isLength({ min: 5 })
    .withMessage('El nombre debe tener al menos 5 caracteres')
    .bail(),
  body('descripcion')
    .notEmpty()
    .withMessage('Este campo es obligatorio')
    .bail()
    .isLength({ min: 20 })
    .withMessage('La descripción debe tener al menos 20 caracteres')
    .bail(),
  body('precio')
    .notEmpty()
    .withMessage('Este campo no puede estar vacio')
    .bail(),
  body('imagen')
    .custom((value, { req }) => {
      let nombreArchivo = req.files['imagen'][0].filename;
      let arrayNombre = nombreArchivo.split('.');
      let extension = arrayNombre.pop();

      if (extension != 'jpg' && extension != 'png' && extension != 'jpeg') {
        throw new Error('Tiene que ser un archivo de imagen');
      }
      return true;
    })
    .bail(),
  body('portada')
    .custom((value, { req }) => {
      let nombreArchivo = req.files['portada'][0].filename;
      let arrayNombre = nombreArchivo.split('.');
      let extension = arrayNombre.pop();

      if (extension != 'jpg' && extension != 'png' && extension && 'jpeg') {
        throw new Error('Tiene que ser un archivo de imagen');
      }
      return true;
    })
    .bail(),
  body('video')
    .custom((value, { req }) => {
      let nombreArchivo = req.files['video'][0].filename;
      let arrayNombre = nombreArchivo.split('.');
      let extension = arrayNombre.pop();

      if (nombreArchivo == 0) {
        throw new Error('Este campo es obligatorio');
      } else if (extension != 'mkv' && extension != 'mp4') {
        throw new Error('Tiene que ser un archivo de video');
      }
      return true;
    })
    .bail(),
];

module.exports = validationProduct;
