const path = require('path');

exports.getIndex = (req, res, next) => {
	res.render('index.ejs');
};

exports.getCart = (req, res, next) => {
	res.render('products/productCart');
};

exports.getDetailCartstandart = (req, res, next) => {
	res.render('products/productDetail-standart');
};

exports.getAddProduct = (req, res, next) => {
	res.render('products/addProductForm');
};

exports.getEditProduct = (req, res, next) => {
	const { productId } = req.params;

	console.log(productId);
	res.render('products/editProductForm');
};
