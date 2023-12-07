const Database = require('../database/models');
const Op = Database.Sequelize.Op;

exports.all = (req, res) => {
    Database.product.findAll().then(products => {
        return res.json(products);
    })
}