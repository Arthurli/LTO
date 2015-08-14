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
	userId: {
		type: Sequelize.INTEGER(11).UNSIGNED,
		field: "user_id",
		allowNull: false
	},
	uuid: {
		type: Sequelize.STRING.BINARY,
		field: "uuid",
		allowNull: false
	},
	labelUUID: {
		type: Sequelize.STRING.BINARY,
		field: "label_uuid",
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
	},
	terminatorUUID: {
		type: Sequelize.STRING.BINARY,
		field: "terminator_uuid",
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
		type: Sequelize.STRING,
		field: "expired_at",
	}
});