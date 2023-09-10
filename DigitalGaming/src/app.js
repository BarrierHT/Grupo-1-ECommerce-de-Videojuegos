const path = require('path');

const express = require('express');

const mainRoute = require('./routes/mainRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

require('dotenv').config();

const app = express();

// app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'resources')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(process.env.PORT);

app.use(mainRoute);

app.use('/products', productRoute);

app.use(userRoute);

app.use((req, res, next) => {
	res.render('404');
});

app.listen(app.get(process.env.PORT) || 3000);
