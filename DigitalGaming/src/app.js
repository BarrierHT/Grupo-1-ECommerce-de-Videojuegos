const path = require('path');

const express = require('express');
const authController = require('./controllers/auth');
const shopController = require('./controllers/shop');

require('dotenv').config();

const app = express();

// app.use(express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'resources')));

app.set(process.env.PORT);

app.get('/', shopController.getIndex);

app.get('/login', authController.getLogin);

app.get('/productCart', shopController.getCart);

app.get('/productDetail', shopController.getDetailCart);

app.get('/register', authController.getSignUp);

app.listen(app.get(process.env.PORT) || 3000);
