const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
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
