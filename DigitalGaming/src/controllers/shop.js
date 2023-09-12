const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ruta al archivo JSON de productos
const productsFilePath = path.join(__dirname, '../data/productos.json');

function readProductsFile() {
	const productsData = fs.readFileSync(productsFilePath, 'utf8');
	return JSON.parse(productsData);
}

// Guardar los productos en el archivo JSON
function saveProductsToFile(products) {
	fs.writeFileSync(
		productsFilePath,
		JSON.stringify(products, null, 2),
		'utf8'
	);
}

exports.getIndex = (req, res, next) => {
	fs.readFile(productsFilePath, 'utf8', (err,data)=>{
		if(err){
			console.error('Error al leer el JSON', err);
			return res.status(500).send('error interno server');
		}
		const productos = JSON.parse(data);
		const productosLimitados = productos.slice(0, 8);
		res.render('index.ejs', { productos: productosLimitados });
	})
};

exports.getCart = (req, res, next) => {
	res.render('products/productCart');
};

exports.getDetailCartstandart = (req, res, next) => {
	res.render('products/productDetail-standart');
};

//* CRUD METHODS

exports.getProducts = (req, res, next) => {
	const products = readProductsFile();

	console.log(products);

	//res.send(products);

	res.render('products/product-list', { products });
};

exports.getAddProduct = (req, res, next) => {
	//Formulario de para dar alta productos

	res.render('products/addProductForm');
};

exports.getEditProduct = (req, res, next) => {
	const productId = req.params.productId;
	// Obtener los datos del producto para editar
	const products = readProductsFile();
	const product = products.find(p => p.id === productId);

	if (!product) {
		// Manejar el caso en que el producto no se encuentra
		res.status(404).render('404');
	} else {
		res.render('products/editProductForm', { product });
	}
};

exports.getProductDetail = (req, res, next) => {
	const productId = req.params.productId;
	// Lógica para obtener los detalles de un producto particular
	const products = readProductsFile();
	const findProduct = products.find(product => product.id == productId);

	if (!findProduct) {
		// Manejar el caso en que el producto no se encuentra
		res.status(404).render('404');
	} else {
		res.render('products/productDetail-standart', { findProduct });
	}
};

exports.postAddProduct = (req, res, next) => {
	// Lógica para procesar y agregar un nuevo producto
	const productData = req.body;

	// Leer la lista actual de productos desde el archivo JSON
	const products = readProductsFile();

	// Generar un nuevo ID para el producto (puedes usar alguna estrategia adecuada)
	const newProductId = generateProductId();

	// Crear un nuevo objeto de producto con los datos del formulario
	const newProduct = {
		id: newProductId,
		nombre: productData.nombre,
		descripcion: productData.descripcion,
		precio: parseFloat(productData.precio), // Convierte a número
		imagen: productData.imagen || 'undefined', // Manejo de valores nulos
		portada: productData.portada || 'undefined',
		video: productData.video || 'undefined',
		categoria: productData.categoria,
		requisitos: productData.requisitos || { MINIMOS: {}, RECOMENDADOS: {} }, // Manejo de valores nulos
	};

	// Agregar el nuevo producto a la lista de productos
	products.push(newProduct);

	// Guardar la lista de productos actualizada en el archivo JSON
	saveProductsToFile(products);

	//res.send(products);

	res.redirect('/products');
};

exports.putEditProduct = (req, res, next) => {
	const productId = req.params.productId;
	const updatedProductData = req.body;

	// Leer la lista actual de productos desde el archivo JSON
	const products = readProductsFile();

	// Encuentra el producto existente por su ID
	const existingProductIndex = products.findIndex(
		product => product.id == productId
	);

	if (existingProductIndex === -1) {
		// return res.send('404');
		return res.status(404).render('404');
	}

	// Obtiene el producto existente
	const existingProduct = products[existingProductIndex];

	// Actualiza los campos que existen tanto en el producto existente como en updatedProductData
	for (const key in updatedProductData) {
		if (key !== 'id') {
			existingProduct[key] = updatedProductData[key];
		}
	}

	// Actualiza el producto en la fuente de datos (archivo JSON)
	products[existingProductIndex] = existingProduct;

	// Guarda la lista de productos actualizada en el archivo JSON
	saveProductsToFile(products);

	//res.send(products);

	// Redirige a la página de detalles del producto actualizado
	res.redirect('/products/' + productId);
};

exports.deleteProduct = (req, res, next) => {
	const productId = req.params.productId;
	// Lógica para eliminar un producto
	// Leer la lista actual de productos desde el archivo JSON
	const products = readProductsFile();

	// Filtrar la lista de productos para eliminar el producto con el ID dado
	const updatedProducts = products.filter(
		product => product.id !== productId
	);

	if (products.length === updatedProducts.length) {
		// Manejar el caso en que el producto no se encuentra
		res.status(404).render('404');
	} else {
		// Guardar la lista de productos actualizada en el archivo JSON
		saveProductsToFile(updatedProducts);

		res.redirect('/products');
	}

	//res.send(updatedProducts);
};

function generateProductId() {
	// Utiliza uuidv4 para generar un ID único
	return uuidv4();
}
