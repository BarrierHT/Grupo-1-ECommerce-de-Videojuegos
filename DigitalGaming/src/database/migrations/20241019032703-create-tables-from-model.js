'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Crear tabla 'rol'
		await queryInterface.createTable('rol', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true,
			},
		});

		// Crear tabla 'requeriment'
		await queryInterface.createTable('requeriment', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			os_recommended: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			os_minumum: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			processor_recommended: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			processor_minimum: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			memory_recommended: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			memory_minimum: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			graphic_recommended: {
				type: Sequelize.STRING(40),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			graphic_minimum: {
				type: Sequelize.STRING(40),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			storage_recommended: {
				type: Sequelize.STRING(15),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
			storage_minimum: {
				type: Sequelize.STRING(15),
				allowNull: true,
				defaultValue: 'Unspecified',
			},
		});

		// Crear tabla 'user'
		await queryInterface.createTable('user', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(40),
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(70),
				allowNull: false,
			},
			rol_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'rol', // Hace referencia a la tabla 'rol'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'RESTRICT',
			},
			user_image: {
				type: Sequelize.STRING(120),
				allowNull: true,
				defaultValue: '/default.png',
			},
		});

		// Crear tabla 'cart'
		await queryInterface.createTable('cart', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'user', // Hace referencia a la tabla 'users'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			totalCartPrice: {
				type: Sequelize.DECIMAL(10, 0),
				allowNull: true,
				defaultValue: 0,
			},
		});

		// Crear tabla 'product'
		await queryInterface.createTable('product', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(400),
				allowNull: false,
			},
			price: {
				type: Sequelize.DECIMAL(10, 0),
				allowNull: false,
			},
			discount: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			image: {
				type: Sequelize.STRING(120),
				allowNull: false,
			},
			cover: {
				type: Sequelize.STRING(120),
				allowNull: false,
			},
			video: {
				type: Sequelize.STRING(120),
				allowNull: false,
			},
			requirement_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'requeriment', // Hace referencia a la tabla 'requeriment'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});

		// Crear tabla 'platform'
		await queryInterface.createTable('platform', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true,
			},
		});

		// Crear tabla 'category'
		await queryInterface.createTable('category', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true,
			},
		});

		// Crear tabla 'product_cart'
		await queryInterface.createTable('product_cart', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			cart_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'cart', // Hace referencia a la tabla 'cart'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product', // Hace referencia a la tabla 'product'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			total_price: {
				type: Sequelize.DECIMAL(10, 0),
				allowNull: false,
			},
		});

		// Crear tabla 'product_category'
		await queryInterface.createTable('product_category', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'product', // Hace referencia a la tabla 'product'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'category', // Hace referencia a la tabla 'category'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});

		// Crear tabla 'product_platform'
		await queryInterface.createTable('product_platform', {
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'product', // Hace referencia a la tabla 'product'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			platform_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'platform', // Hace referencia a la tabla 'platform'
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
		});

		// Agregar índice a la tabla 'product'
		await queryInterface.addIndex('product', ['requirement_id'], {
			name: 'requirement_idx',
			using: 'BTREE',
		});
	},

	async down(queryInterface, Sequelize) {
		// Eliminar índices de la tabla 'product'
		await queryInterface.removeIndex('product', 'requirement_idx');

		// Eliminar las tablas de relaciones primero
		await queryInterface.dropTable('product_platform');
		await queryInterface.dropTable('product_category');
		await queryInterface.dropTable('product_cart');

		// Eliminar las tablas individuales después
		await queryInterface.dropTable('category');
		await queryInterface.dropTable('platform');
		await queryInterface.dropTable('requeriment');
		await queryInterface.dropTable('product');
		await queryInterface.dropTable('cart');
		await queryInterface.dropTable('rol');
		await queryInterface.dropTable('user');
	},
};
