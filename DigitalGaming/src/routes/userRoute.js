const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const multer = require('../middlewares/multer');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/register', authController.getSignUp);
router.post('/register', multer, authController.postSignUp);

module.exports = router;
