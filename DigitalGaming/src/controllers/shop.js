const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Validaciones de los productos
const { validationResult } = require('express-validator');

// Ruta al archivo JSON de productos
//const productsFilePath = path.join(__dirname, '../data/productos.json');

//Modelo del producto
const Product = require('../app').models.product;
const Requeriment = require('../app').models.requeriment;
const Category = require('../app').models.category;
const Platform = require('../app').models.platform;
const Product_category = require('../app').models.product_category;
const Product_platform = require('../app').models.product_platform;

// function readProductsFile() {
// 	const productsData = fs.readFileSync(productsFilePath, 'utf8');
// 	return JSON.parse(productsData);
// }

// Guardar los productos en el archivo JSON
// function saveProductsToFile(products) {
// 	fs.writeFileSync(
// 		productsFilePath,
// 		JSON.stringify(products, null, 2),
// 		'utf8'
// 	);
// }

exports.getIndex = async (req, res, next) => {
	try {
		const productsFetched = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'categories', // Utiliza el alias aquí
					through: {
						model: Product_category,
						attributes: [], // Evitar traer todos los campos de la tabla intermedia
					},
					attributes: ['name'], // Solo traer el nombre de la categoría
				},
			],
		});

		//console.log('PRODUCTOS FETCHED: ', productsFetched);

		const formattedProducts = productsFetched.map(product => ({
			...product.toJSON(),
			categories: product.categories.map(category => category.name),
		}));

		//console.log('products: ', formattedProducts);

		res.render('index.ejs', { productos: formattedProducts });
	} catch (error) {
		throw error('Error fetching data:', error);
	}

	// console.log(productosLimitados.length);
};

exports.getCart = (req, res, next) => {
	res.render('products/productCart');
};

exports.getDetailCartstandart = (req, res, next) => {
	res.render('products/productDetail-standart');
};

//* --------------------CRUD METHODS--------------------------------------//

//Trae los productos en un listado
exports.getProducts = async (req, res, next) => {
	try {
		let products = await Product.findAll();
		res.render('products/product-list', { products });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.getCategories = async (req, res, next) => {
	try {
		let categories = await Category.findAll();
		res.render('products/category-list', { categories });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

//Trae el detalle de un producto
exports.getProductDetail = async (req, res, next) => {
	//console.log('PRODUCTOS FETCHED: ', productsFetched);

	try {
		const productFetched = await Product.findByPk(req.params.productId, {
			include: [
				{
					model: Category,
					as: 'categories', // Utiliza el alias aquí
					through: {
						model: Product_category,
						attributes: [], // Evitar traer todos los campos de la tabla intermedia
					},
					attributes: ['name'], // Solo traer el nombre de la categoría
				},
				{
					model: Requeriment,
					required: true,
					as: 'requeriment',
				},
			],
		});

		res.render('products/productDetail-standart', {
			detail: productFetched,
		});
		// res.send(detail);
		//console.log(detail.dataValues.requeriment.dataValues.os_recommended);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

//Formulario de para dar alta productos
exports.getAddProduct = (req, res, next) => {
	res.render('products/addProductForm');
};

exports.postAddProduct = async (req, res, next) => {
	// Lógica para procesar y agregar un nuevo producto

	const validation = validationResult(req);

	if (validation.errors.length > 0) {
		// console.log('Errors: ', validation.errors.length);
		res.render('products/addProductForm', {
			errors: validation.mapped(),
			oldValue: req.body,
		});
	} else {
		try {
			const productData = req.body; //tiene los datos del formulario

			const platformId = parseInt(productData.plataforma); //toma el valor de la plataforma y lo parse a un integer

			//almacena un array con los valores de la categorias
			let categoryAssociate = [
				productData.categoria_1,
				productData.categoria_2,
				productData.categoria_3,
				productData.categoria_4,
				productData.categoria_5,
			];

			categoryAssociate = categoryAssociate.filter(item => {
				return item != undefined;
			});
			let parseCategory = categoryAssociate.map(item => {
				return parseInt(item);
			});

			//Variable que almacena el objeto creado para los requerimientos de la pc
			let newRequeriment = await Requeriment.create({
				os_recommended: productData.os_r,
				os_minumum: productData.os_m,
				processor_recommended: productData.procesador_r,
				processor_minimum: productData.procesador_m,
				memory_recommended: productData.memoria_r,
				memory_minimum: productData.memoria_m,
				graphic_recommended: productData.graficos_r,
				graphic_minimum: productData.graficos_m,
				storage_recommended: productData.almacenamiento_r,
				storage_minimum: productData.almacenamiento_m,
			});
			//variable que almacenará la creación del producto con los datos obtenidos en el body
			let newProduct = await Product.create({
				name: productData.nombre,
				description: productData.descripcion,
				price: productData.precio,
				discount: productData.descuento,
				image: '/img/productsBD/' + req.files['imagen'][0].filename,
				cover: '/img/productsBD/' + req.files['portada'][0].filename,
				video: '/img/productsBD/' + req.files['video'][0].filename,
				requirement_id: newRequeriment.id,
			});

			//Variable que almacena el objeto que contiene el registro segun la variable platformId
			let idPlatform = await Platform.findByPk(platformId);
			await newProduct.setPlatforms(idPlatform.id);

			//Bucle para crear los registros de la tabla de product_category
			for (let i = 0; i < parseCategory.length; i++) {
				const elementCategory = parseCategory[i];

				await Product_category.create({
					product_id: newProduct.id,
					category_id: elementCategory,
				});
			}

			res.redirect('/products');
		} catch (error) {
			console.error('error al crear el producto', error);
			return res.status(500).json({ message: error });
		}
	}
};

//Trae el formulario para editar un producto YA CREADO
exports.getEditProduct = async (req, res, next) => {
	/*   const productId = req.params.productId;
  // Obtener los datos del producto para editar
  const products = readProductsFile();
  const product = products.find((p) => p.id == productId.toString());

  if (!product) {
    // Manejar el caso en que el producto no se encuentra
    res.status(404).render('404');
  } else {
    res.render('products/editProductForm', { product });
  } */
	const requerimentDestroy = await Product.findByPk(req.params.productId, {
		include: [
			{
				model: Requeriment,
				required: true,
				as: 'requeriment',
			},
		],
	});
	console.log(requerimentDestroy.requeriment.id);
	let product = await Product.findByPk(req.params.productId, {
		include: [
			{
				model: Requeriment,
				required: true,
				as: 'requeriment',
			},
		],
	});
	res.render('products/editProductForm', { product: product });
};
//Manda los datos del formulario a la base de datos
exports.putEditProduct = async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const updatedProductData = req.body;
		let product = await Product.findByPk(req.params.productId, {
			include: [
				{
					model: Requeriment,
					required: true,
					as: 'requeriment',
				},
			],
		});

		await Requeriment.update(
			{
				os_recommended: updatedProductData.os_r,
				os_minumum: updatedProductData.os_m,
				processor_recommended: updatedProductData.procesador_r,
				processor_minimum: updatedProductData.procesador_m,
				memory_recommended: updatedProductData.memoria_r,
				memory_minimum: updatedProductData.memoria_m,
				graphic_recommended: updatedProductData.graficos_r,
				graphic_minimum: updatedProductData.graficos_m,
				storage_recommended: updatedProductData.almacenamiento_r,
				storage_minimum: updatedProductData.almacenamiento_m,
			},
			{
				where: {
					id: product.requeriment.id,
				},
			}
		);

		await Product.update(
			{
				name: updatedProductData.nombre,
				description: updatedProductData.descripcion,
				price: updatedProductData.precio,
				discount: updatedProductData.descuento,
			},
			{
				where: {
					id: productId,
				},
			}
		);

		res.redirect(`/products/${productId}`);
	} catch (error) {
		console.error('Error al editar el producto:', error);
		return res
			.status(500)
			.json({ message: 'no se pudo completar la accion' });
	}
};

//Elimina el producto seleccionado por su ID
exports.deleteProduct = async (req, res, next) => {
	try {
		const productId = req.params.productId;
		let requerimentDestroy = await Product.findByPk(req.params.productId);

		await Product_category.destroy({
			where: {
				product_id: productId,
			},
		});

		await Product_platform.destroy({
			where: {
				product_id: productId,
			},
		});

		await Product.destroy({
			where: {
				id: productId,
			},
		});

		await Requeriment.destroy({
			where: {
				id: requerimentDestroy.requirement_id,
			},
		});
		res.redirect('/products');
	} catch (error) {
		console.error('error al eliminar el producto', error);
		return res.status(500).json({ message: 'no se completo la accion' });
	}
};
