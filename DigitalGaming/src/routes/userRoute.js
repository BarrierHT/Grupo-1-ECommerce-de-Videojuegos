const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

const multer = require('../middlewares/multer');
const validationsSignUp = require('../middlewares/validationSignUp');

const isAuth = require('../middlewares/is-Auth').isAuth;
const isNotAuth = require('../middlewares/is-Auth').isNotAuth;

router.get('/login', isNotAuth, authController.getLogin);
router.post('/login', isNotAuth, authController.postLogin);

router.get('/logout', isAuth, authController.getLogout);

router.get('/register', isNotAuth, authController.getSignUp);
router.post(
  '/register',
  isNotAuth,
  multer,
  validationsSignUp,
  authController.postSignUp,
);

// router.get('/getUser', userController.getUserByEmail);
//router.delete('/deleteUser', userController.deleteUserByEmail);
//router.put('/updateUser', userController.updateUserByEmail);

module.exports = router;
