const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'user',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(15),
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING(15),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(40),
				allowNull: false,
				unique: 'email',
			},
			password: {
				type: DataTypes.STRING(70),
				allowNull: false,
			},
			rol_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'rol',
					key: 'id',
				},
			},
			user_image: {
				type: DataTypes.STRING(120),
				allowNull: true,
				defaultValue: '/defauli.png',
			},
		},
		{
			sequelize,
			tableName: 'user',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'email',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'email' }],
				},
				{
					name: 'password',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'password' }],
				},
				{
					name: 'rol_id',
					using: 'BTREE',
					fields: [{ name: 'rol_id' }],
				},
			],
		}
	);
};
