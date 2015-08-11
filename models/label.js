var Sequelize = require('sequelize');
var sequelize = require('./db.js');

module.exports = sequelize.define("label", {
		id: {
			field: "id",
			type: Sequelize.INTEGER(11).UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		uuid: {
			field: "uuid",
			type: Sequelize.STRING.BINARY,
			allowNull: false
		},
		userId: {
			field: "user_id",
			type: Sequelize.INTEGER(11).UNSIGNED,
			references: {
     		model: "user",
     		key: 'id',
  	 	},
    	allowNull: false
		},
		userType: {
			field: "user_type",
			type: Sequelize.ENUM('user', 'group'),
			allowNull: false,
			defaultValue: "user"
		},
		name: {
			field: "name",
			type: Sequelize.STRING,
			allowNull: false
		},
		type: {
			field: "type",
			type: Sequelize.ENUM('default', 'user_create'),
			allowNull: false,
			defaultValue: "default"
		}
	});