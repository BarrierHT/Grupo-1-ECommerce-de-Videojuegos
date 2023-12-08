const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');

const db = require('./database/models/index');
const initModels = require('./database/models/init-models');
exports.models = initModels(db.sequelize);

// console.log(db.sequelize.query());

const mainRoute = require('./routes/mainRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

//Rutas para las apis
const apiProducts = require('./routes/api/apiProducts');
const apiUsers = require('./routes/api/apiUsers');

const override = require('method-override');

require('dotenv').config();

const app = express();

//const productsFilePath = path.join(__dirname, './data/productos.json');

// function readProductsFile() {
// 	const productsData = fs.readFileSync(productsFilePath, 'utf8');
// 	return JSON.parse(productsData);
// }

let corsOptions = {
	origin: '*',
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(process.env.PORT);

// app.use(express.static(__dirname + '/'));

/*
  Esto define una función llamada allowCrossDomain, que actúa como un middleware personalizado.
  La función toma tres argumentos: req (la solicitud), res (la respuesta) y next (una función que
  permite pasar la solicitud al siguiente middleware
 
let allowCrossDomain = function(req, res, next) {
	
		Se establecen varias cabeceras de respuesta (res.header) para permitir que diferentes dominios 
	   realicen solicitudes a tu servido
	 
	  res.header('Access-Control-Allow-Origin', "*");
	  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
	  res.header('Access-Control-Allow-Headers', "*");
	  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	  next();
	}
*/
app.use(cors(corsOptions));
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

app.use(userRoute);
app.use(adminRoute);

app.use('/api/products', apiProducts);
app.use('/api/users', apiUsers);

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
