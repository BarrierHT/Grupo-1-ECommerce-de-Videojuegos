var DataTypes = require('sequelize').DataTypes;
var _cart = require('./cart');
var _category = require('./category');
var _platform = require('./platform');
var _product = require('./product');
var _product_cart = require('./product_cart');
var _product_category = require('./product_category');
var _product_platform = require('./product_platform');
var _requeriment = require('./requeriment');
var _rol = require('./rol');
var _user = require('./user');

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var platform = _platform(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_cart = _product_cart(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var product_platform = _product_platform(sequelize, DataTypes);
  var requeriment = _requeriment(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  //--------------Asociaciones del modelo Product----------------------//
  product.belongsTo(requeriment, {
    as: 'requeriment',
    foreignKey: 'requirement_id',
  });
  product.belongsToMany(category, {
    as: 'categories',
    through: 'product_category',
    foreignKey: 'product_id',
    otherKey: 'category_id',
  });
  product.belongsToMany(platform, {
    as: 'platforms',
    through: 'product_platform',
    foreignKey: 'product_id',
    otherKey: 'platform_id',
  });
  //------------------Asociaciones del modelo Category---------------------//
  category.belongsToMany(product, {
    as: 'products',
    through: 'product_category',
    foreignKey: 'category_id',
    otherKey: 'product_id',
  });
  //--------------------Asociaciones del modelo Platform------------------//
  platform.belongsToMany(product, {
    as: 'products',
    through: 'product_platform',
    foreignKey: 'platform_id',
    otherKey: 'product_id',
  });
  //-----------------Asociaciones del modelo Requeriment---------------//
  requeriment.hasMany(product, {
    as: 'products',
    foreignKey: 'requirement_id',
  });
  //-----------------Asociaciones del modelo User---------------//
  user.belongsTo(rol, { as: 'rol', foreignKey: 'rol_id' });
  //-----------------Asociaciones del modelo Rol---------------//
  rol.hasMany(user, { as: 'users', foreignKey: 'rol_id' });
  /*   product_category.belongsTo(category, {
    as: 'category',
    foreignKey: 'category_id',
  }); */
  /*   product_platform.belongsTo(platform, {
    as: 'platform',
    foreignKey: 'platform_id',
  }); */
  /*   product_category.belongsTo(product, {
    as: 'product',
    foreignKey: 'product_id',
  }); */
  /*   product_platform.belongsTo(product, {
    as: 'product',
    foreignKey: 'product_id',
  }); */

  return {
    cart,
    category,
    platform,
    product,
    product_cart,
    product_category,
    product_platform,
    requeriment,
    rol,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
