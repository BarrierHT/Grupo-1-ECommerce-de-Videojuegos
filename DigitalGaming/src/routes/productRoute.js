const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

const isAuth = require('../middlewares/is-Auth').isAuth;

router.get('/productCart', isAuth, shopController.getCart);
router.get(
  '/productDetail-standart',
  isAuth,
  shopController.getDetailCartstandart,
);

// router.get('/editProductForm/:productId', shopController.getEditProduct);

router.get('/', shopController.getProducts); //Listado de productos
router.get('/:productId', shopController.getProductDetail); //Detalle de un producto particular

router.get('/create', shopController.getAddProduct); //Form de agregar productos
router.post('/', isAuth, shopController.postAddProduct); //Crear producto

router.get('/:productId/edit', isAuth, shopController.getEditProduct); //Formulario de editar producto
router.put('/:productId', isAuth, shopController.putEditProduct); //Editar producto

router.delete('/:productId', isAuth, shopController.deleteProduct); //Borrar producto

module.exports = router;
