const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/productCart', shopController.getCart);
router.get('/productDetail-standart', shopController.getDetailCartstandart);

router.get('/editProductForm/:productId', shopController.getEditProduct);

router.get('/', shopController.getProducts); //Listado de productos

router.get('/create', shopController.getAddProduct); //Form de agregar productos

router.get('/:productId', shopController.getProductDetail); //Detalle de un producto particular

router.post('/', shopController.postAddProduct); //Crear producto

router.get('/:productId/edit', shopController.getEditProduct); //Formulario de editar producto

router.put('/:productId', shopController.putEditProduct); //Editar producto

router.delete('/:productId', shopController.deleteProduct); //Borrar producto

module.exports = router;
