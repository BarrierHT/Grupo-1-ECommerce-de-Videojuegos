const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/productCart', shopController.getCart);
router.get('/productDetail-standart', shopController.getDetailCartstandart);

router.get('/add-product', shopController.getAddProduct);
router.get('/edit-product/:productId', shopController.getEditProduct);

module.exports = router;
