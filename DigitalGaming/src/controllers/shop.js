const path = require('path');
const fs = require('fs');

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf-8')
);
exports.getIndex = (req, res, next) => {
  res.render('index.ejs', { products });
};

exports.getCart = (req, res, next) => {
  res.render('products/productCart');
};

exports.getDetailCartstandart = (req, res, next) => {
  res.render('products/productDetail-standart');
};

//* CRUD METHODS

exports.getProducts = (req, res, next) => {
  //Conseguir todos los productos
  res.render('products/product-list');
};

exports.getAddProduct = (req, res, next) => {
  //Formulario de para dar alta productos
  res.render('products/addProductForm');
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Lógica para obtener los datos del producto y mostrar el formulario de edición
  res.render('products/editProductForm', { productId });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  // Lógica para obtener los detalles de un producto particular
  const findProduct = products.find((product) => product.id == productId);
  res.render('products/productDetail-standart', { findProduct });
};

exports.postAddProduct = (req, res, next) => {
  // Lógica para procesar y agregar un nuevo producto
  const productData = req.body;
  // ...
  res.redirect('/products');
};

exports.putEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Lógica para editar un producto existente
  const updatedProductData = req.body;
  // ...
  res.redirect('/products/' + productId); //redirigir a detail de producto
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Lógica para eliminar un producto
  // ...
  res.redirect('/products');
};
