const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-Auth').isAuth;
/* 
router.get('/dashboard', isAuth, adminController.getDash);  
*/
router.get('/dashboard', /* isAuth, */ adminController.getAllUsers);

module.exports = router;
