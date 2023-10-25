const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requeriment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    os_recommended: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    os_minumum: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    processor_recommended: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    processor_minimum: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    memory_recommended: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    memory_minimum: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    graphic_recommended: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    graphic_minimum: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    storage_recommended: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: "Unspecified"
    },
    storage_minimum: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: "Unspecified"
    }
  }, {
    sequelize,
    tableName: 'requeriment',
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
    ]
  });
};
