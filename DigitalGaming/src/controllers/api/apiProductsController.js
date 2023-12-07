const Product = require('../../app').models.product;
const Category = require('../../app').models.category;
const Product_category = require('../../app').models.product_category;

module.exports = {
  list: async (req, res) => {
    const data = await Product.findAll({
      attributes: ['id', 'name', 'description'],
      include: ['requeriment'],
    });

    const dataCategories = await Category.findAll();
    const dataProductCategories = await Product_category.findAll({
      attributes: ['category_id'],
    });

    const countCategory = (arrayCategories, arrayProductCategories) => {
      let objectCategory = {};

      for (let i = 0; i < arrayCategories.length; i++) {
        let arrayCount;
        arrayCount = arrayProductCategories.filter((elem) => {
          return elem.category_id == arrayCategories[i].id;
        });
        objectCategory[arrayCategories[i].name] = arrayCount.length;
      }
      return objectCategory;
    };
    console.log(countCategory(dataCategories, dataProductCategories));

    res.json({
      code: 200,
      count: data.length,
      countByCategory: countCategory(dataCategories, dataProductCategories),
      products: data,
    });
  },
  
  getProductById : async (req, res) => {

    const productId = req.params.id;

    try {
      // Se busca en la base de datos
      const product = await Product.findByPk(productId);
  
      if (!product) {
        // error 404
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // retorno de producto
      return res.status(200).json(product);
    } catch (error) {
      // error al buscar
      return res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
    }
  }
};


