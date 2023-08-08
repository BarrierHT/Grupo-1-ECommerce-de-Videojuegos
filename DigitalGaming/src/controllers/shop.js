const path = require('path');

exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

exports.getCart = (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'productCart.html'));
};

exports.getDetailCart = (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'productDetail.html'));
};

exports.getDetailCartstandart = (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'productDetail-standart.html'));
};

