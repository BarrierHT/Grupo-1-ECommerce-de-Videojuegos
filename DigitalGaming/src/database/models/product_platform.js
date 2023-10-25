const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_platform', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    platform_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_platform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "platform_id",
        using: "BTREE",
        fields: [
          { name: "platform_id" },
        ]
      },
    ]
  });
};
