const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    video: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    requirement_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'requeriment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
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
        name: "requirement_idx",
        using: "BTREE",
        fields: [
          { name: "requirement_id" },
        ]
      },
    ]
  });
};
