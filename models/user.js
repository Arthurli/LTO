var Sequelize = require('sequelize');
var sequelize = require('./db.js');

module.exports = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER(11).UNSIGNED,
		field: "id",
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	uuid: {
		type: Sequelize.STRING.BINARY,
		field: "uuid",
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		field: "name",
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		field: "password",
		allowNull: false
	},
}, {
	timestamps: true,
	freezeTableName: true,
});