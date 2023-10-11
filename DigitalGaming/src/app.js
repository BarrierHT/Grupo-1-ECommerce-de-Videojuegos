const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const fs = require('fs');

const mainRoute = require('./routes/mainRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

const override = require('method-override');

require('dotenv').config();

const app = express();

const productsFilePath = path.join(__dirname, './data/productos.json');

function readProductsFile() {
	const productsData = fs.readFileSync(productsFilePath, 'utf8');
	return JSON.parse(productsData);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(process.env.PORT);

// app.use(express.static(__dirname + '/'));
app.use(override('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'resources')));

app.use(
	session({
		secret: process.env.SECRET_SESSION,
		resave: false,
		saveUninitialized: false,
	})
);

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.user ? true : false;
	res.locals.user = req.session.user || null;
	next();
});

app.use(morgan('dev'));

app.use('/', mainRoute);
app.use('/products', productRoute);

// app.use('/login', (req, res, next) => {
// 	if (res.locals.isAuthenticated) {
// 		res.redirect('/productCart');
// 	} else {
// 		next();
// 	}
// });

// app.use((req, res, next) => {
// 	if (!res.locals.isAuthenticated) {
// 		res.redirect('/register');
// 	} else {
// 		next();
// 	}
// });

app.use(userRoute);
app.use(adminRoute);

app.use((req, res, next) => {
	res.render('404');
});

app.use((err, req, res, next) => {
	//ERROR MIDDLEWARE
	console.log('Error(middleware): ', err);
	const status = err.statusCode || 500;
	const message = err.message || 'Server error';
	const data = err.data || {};
	// return res.status(status).json({ message, data })

	return res.status(status).render('index', {
		message,
		data,
		productos: readProductsFile().slice(0, 8),
	});
});

app.listen(app.get(process.env.PORT) || 3000);
