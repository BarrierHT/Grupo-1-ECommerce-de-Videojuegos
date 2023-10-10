const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const multer = require('../middlewares/multer');
const validationsSingUp = require('../middlewares/validationSignUp');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/register', authController.getSignUp);
router.post('/register', multer, validationsSingUp, authController.postSignUp);

module.exports = router;
