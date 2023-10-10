const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    //que tipo de extensiones de archivo están permitidas
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); //acepta archivo con extensiones permitidas
    } else {
      cb(new Error('El archivo debe tener una extensión .jpg, .jpeg o .png'));
    }
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img/users'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'usuario_Image' + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadFile = multer({ storage }).single('imagen');

module.exports = uploadFile;
