const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mainRoute = require('./routes/mainRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

const override = require('method-override');

require('dotenv').config();

const app = express();

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
	console.log('Session: ', req.session);
	next();
});

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.user ? true : false;
	if (res.locals.isAuthenticated) res.locals.user = req.session.user;
	next();
});

app.use(mainRoute);

app.use('/products', productRoute);

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
	// return res.status(status).json({ message, data });
	return res.status(status).render('index', {
		message,
		data,
	});
});

app.listen(app.get(process.env.PORT) || 3000);
