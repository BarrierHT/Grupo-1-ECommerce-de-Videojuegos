const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/apiUsersController');

router.get('/', apiUsersController.getUsers);
router.get('/:id', apiUsersController.getUserById);

module.exports = router;
