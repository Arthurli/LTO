var Sequelize = require('sequelize');
var sequelize = require('./db.js');

module.exports = sequelize.define("todo", {
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
	labelId: {
		type: Sequelize.INTEGER(11).UNSIGNED,
		field: "label_id",
		// references: {
  //    	model: "label",
  //    	key: 'id',
  // 	},
		allowNull: false
	},
	title: {
		type: Sequelize.STRING,
		field: "title",
		allowNull: false
	},
	body: {
		type: Sequelize.STRING,
		field: "body",
		allowNull: false
	},
	ownerUUID: {
		type: Sequelize.STRING.BINARY,
		field: "owner_uuid",
		// references: {
  //    	model: "user",
  //    	key: 'uuid',
  // 	},
		allowNull: false
	},
	terminatorUUID: {
		type: Sequelize.STRING.BINARY,
		field: "terminator_uuid",
		// references: {
  //    	model: "user",
  //    	key: 'uuid',
  // 	},
		allowNull: false
	},
	type: {
		field: "type",
		type: Sequelize.ENUM('user', 'group'),
		allowNull: false,
		defaultValue: "user"
	},
	status: {
		field: "status",
		type: Sequelize.ENUM('default', "done"),
		allowNull: false,
		defaultValue: "default"
	},
	expiredAt: {
		type: Sequelize.DATE,
		field: "expired_at",
	}
});