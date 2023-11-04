const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    //que tipo de extensiones de archivo están permitidas
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', 'mkv'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); //acepta archivo con extensiones permitidas
    } else {
      cb(new Error('El archivo debe tener una extensión .jpg, .jpeg o .png'));
    }
  },
  destination: (req, file, cb) => {
    if (file.fieldname === 'imagen' && file.fieldname === 'portada') {
      cb(null, path.join(__dirname, '../public/img/productsBD'));
    } else if (file.fieldname === 'video') {
      cb(null, path.join(__dirname, '../public/videos'));
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'product_file' + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const uploadFiles = multer({ storage });

module.exports = uploadFiles;
