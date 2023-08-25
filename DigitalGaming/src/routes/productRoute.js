const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/productCart', shopController.getCart);
router.get('/productDetail-standart', shopController.getDetailCartstandart);

router.get('/addProductForm', shopController.getAddProduct);
router.get('/editProductForm/:productId', shopController.getEditProduct);

module.exports = router;
