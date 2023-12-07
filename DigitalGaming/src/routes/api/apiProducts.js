const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api/apiProductsController');

router.get('/', apiController.list);

module.exports = router;
