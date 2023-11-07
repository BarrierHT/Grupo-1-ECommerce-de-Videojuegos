const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

const isAuth = require('../middlewares/is-Auth').isAuth;
const uploadFiles = require('../middlewares/multerProduct');

router.get('/productCart', isAuth, shopController.getCart);
router.get('/productDetail-standart', shopController.getDetailCartstandart);

// router.get('/editProductForm/:productId', shopController.getEditProduct);
router.get('/create', shopController.getAddProduct); //Formulario para crear un producto
router.post(
  '/create',
  uploadFiles.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'portada', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  shopController.postAddProduct,
); //Crear producto

router.get('/', shopController.getProducts); //Listado de productos
router.get('/:productId', shopController.getProductDetail); //Detalle de un producto particular

router.get('/:productId/edit', isAuth, shopController.getEditProduct); //Formulario de editar producto
router.put('/:productId', isAuth, shopController.putEditProduct); //Editar producto

router.delete('/:productId', isAuth, shopController.deleteProduct); //Borrar producto

module.exports = router;
