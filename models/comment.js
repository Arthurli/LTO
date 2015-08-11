var Sequelize = require('sequelize');
var sequelize = require('./db.js');

module.exports = sequelize.define("comment", {
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
	todoUUID: {
		type: Sequelize.STRING.BINARY,
		field: "todo_uuid",
		// references: {
  //     model: "todo",
  //     key: 'uuid',
  // 	},
		allowNull: false
	},
	userUUID: {
		type: Sequelize.STRING.BINARY,
		field: "user_uuid",
		// references: {
  //     model: "user",
  //     key: 'uuid',
  // 	},
		allowNull: false
	},
	userName: {
		type: Sequelize.STRING,
		field: "user_name",
		allowNull: false
	},
	body: {
		type: Sequelize.STRING,
		field: "body",
		allowNull: false
	}
}, {
	updatedAt: false
});