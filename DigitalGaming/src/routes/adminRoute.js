const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const { isAdmin } = require('../middlewares/is-Admin');
const isAuth = require('../middlewares/is-Auth').isAuth;
/* 
router.get('/dashboard', isAuth, adminController.getDash);  
*/
router.get('/dashboard', isAuth, isAdmin, adminController.getAllUsers);

module.exports = router;
