const path = require('path');

const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(__dirname+'/'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources')));
app.set(process.env.PORT);

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/productCart', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'views', 'productCart.html'));
});

app.get('/productDetail', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'views', 'productDetail.html'));
});

app.get('/register', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.listen(app.get(process.env.PORT) || 3000);
