const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api/apiProductsController');

router.get('/', apiController.list);

router.get('/:idProduct', apiController.getProductById);

module.exports = router;
