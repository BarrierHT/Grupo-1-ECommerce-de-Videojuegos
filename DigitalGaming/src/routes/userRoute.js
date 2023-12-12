const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const isAuth = require('../middlewares/is-Auth').isAuth;
const isNotAuth = require('../middlewares/is-Auth').isNotAuth;

// router.get('/getUser', userController.getUserByEmail);
router.get('/editEmailUser', userController.getEmailEditUser);
router.post('/editUser', userController.getEditUser);
router.put('/updateUser', userController.updateUserByEmail);
router.delete('/deleteUser', userController.deleteUserByEmail);

module.exports = router;
