module.exports = {
	development: {
		username: 'root',
		password: 'administrator',
		database: 'digitalgaming',
		host: 'localhost',
		dialect: 'mysql',
	},
	test: {
		username: 'root',
		password: 'administrator',
		database: 'digitalgaming',
		host: 'localhost',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};
