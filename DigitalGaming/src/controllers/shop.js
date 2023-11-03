const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ruta al archivo JSON de productos
const productsFilePath = path.join(__dirname, '../data/productos.json');

//Modelo del producto
const Product = require('../app').models.product;
const Requeriment = require('../app').models.requeriment;
const Product_category = require('../app').models.product_category;
const Product_platform = require('../app').models.product_platform;

function readProductsFile() {
  const productsData = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(productsData);
}

// Guardar los productos en el archivo JSON
function saveProductsToFile(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
}

exports.getIndex = (req, res, next) => {
  const productos = readProductsFile();

  const productosLimitados = productos.slice(0, 8);

  // console.log(productosLimitados.length);

  res.render('index.ejs', { productos: productosLimitados });
};

exports.getCart = (req, res, next) => {
  res.render('products/productCart');
};

exports.getDetailCartstandart = (req, res, next) => {
  res.render('products/productDetail-standart');
};

//* CRUD METHODS

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.findAll();
    res.render('products/product-list', { products });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAddProduct = (req, res, next) => {
  //Formulario de para dar alta productos

  res.render('products/addProductForm');
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Obtener los datos del producto para editar
  const products = readProductsFile();
  const product = products.find((p) => p.id == productId.toString());

  if (!product) {
    // Manejar el caso en que el producto no se encuentra
    res.status(404).render('404');
  } else {
    res.render('products/editProductForm', { product });
  }
};

exports.getProductDetail = async (req, res, next) => {
  /*   const productId = req.params.productId;
  // Lógica para obtener los detalles de un producto particular
  const products = readProductsFile();
  const findProduct = products.find((product) => product.id == productId);

  if (!findProduct) {
    // Manejar el caso en que el producto no se encuentra
    res.status(404).render('404');
  } else {
    res.render('products/productDetail-standart', { findProduct });
  } */
  try {
    const detail = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Requeriment,
          required: true,
          as: 'requeriment',
        },
      ],
    });
    res.render('products/productDetail-standart', { detail: detail });
    // res.send(detail);
    //console.log(detail.dataValues.requeriment.dataValues.os_recommended);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.postAddProduct = async (req, res, next) => {
  // Lógica para procesar y agregar un nuevo producto
  const productData = req.body;

  // Leer la lista actual de productos
  //const newProductId = generateProductId();

  try {
    const newProduct = await Product.create({
      name: productData.nombre,
      description: productData.descripcion,
      price: parseFloat(productData.precio),
      discount: productData.discount,
      image: req.files['imagen'][0].filename,
      cover: req.files['portada'][0].filename,
      video: req.files['video'][0].filename || 'video.mp4',
      requeriment_id: null,
    });

    console.log(req.files);
    // await newProduct.save();
    //console.log('new user: ', newProduct);

    return res.redirect('/products');
  } catch (error) {
    console.error('error al crear el producto', error);
    return res.status(500).json({ message: 'no se completo la accion' });
  }
};

exports.putEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const updatedProductData = req.body;

  try {
    const updatedFormData = {
      name: updatedProductData.nombre,
      description: updatedProductData.descripcion,
      price: parseFloat(updatedProductData.precio),
      discount: updatedProductData.descuento,
      image: updatedProductData.image,
      video: updatedProductData.video,
    };
    const [updatedRowsCount] = await Product.update(updatedFormData, {
      where: {
        id: productId,
      },
    });

    if (updatedRowsCount === 1) {
      console.log('edicion exitosa!');
      return res.redirect('products/' + productId);
    } else {
      console.log('producto no encontrado');
      return res.status(404).render('404');
    }
  } catch (error) {
    console.error('Error al editar el producto:', error);
    return res.status(500).json({ message: 'no se pudo completar la accion' });
  }

  /* 
  // Leer la lista actual de productos desde el archivo JSON
  const products = readProductsFile();

  // Encuentra el producto existente por su ID
  const existingProductIndex = products.findIndex(
    (product) => product.id == productId,
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
  res.redirect('/products/' + productId); */
};

exports.deleteProduct = async (req, res, next) => {
  // console.log(productId);
  // Lógica para eliminar un producto
  // Leer la lista actual de productos desde el archivo JSON
  //const products = readProductsFile();

  // Filtrar la lista de productos para eliminar el producto con el ID dado
  /* const updatedProducts = products.filter(
    (product) => product.id != productId.toString(),
  ); */

  const productId = req.params.productId;

  try {
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

    const result = await Product.destroy({
      where: {
        id: productId,
      },
    });

    if (result === 1) {
      console.log('producto eliminado');
      return res.redirect('/products');
    } else {
      console.log('no encontrado');
      return res.status(404);
    }
  } catch (error) {
    console.error('error al eliminar el producto', error);
    return res.status(500).json({ message: 'no se completo la accion' });
  }

  /* if (products.length === updatedProducts.length) {
    // Manejar el caso en que el producto no se encuentra
    res.status(404).render('404');
  } else {
    // Guardar la lista de productos actualizada en el archivo JSON
    saveProductsToFile(updatedProducts);

    res.redirect('/products');
  } */

  //res.send(updatedProducts);
};

/* function generateProductId() {
  // Utiliza uuidv4 para generar un ID único
  return uuidv4();
} */
