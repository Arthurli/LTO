var async = require('async');
var uuid = require('node-uuid');
var Sequelize = require('sequelize');

var utils = require('./utils');
var exception = require('./exception');
var sequelize = require('../models/db');

var User = require('../models/user');
var Label = require('../models/label');
var Todo = require('../models/todo');
var Group = require('../models/group');
var Comment = require('../models/comment');
/*
	登录
 */
module.exports.init = function (body) {
	return function (cb) {
		var name = body.name;
		var password = utils.cram_md5(body.password);
		console.log("Begin to check user");

		User.findOne({
			where: {
				name: name,
				password: password
			},
		}).then(function(result){
			console.log("find user");
			cb(null, result);
		}).catch(cb);
	};
};

/*
	User相关
 */
module.exports.createUser = function (body) {
	return function (cb) {
		var name = body.name;
		var password = utils.cram_md5(body.password);
		var newUser;
		console.log("body:" + body);
		console.log("name:" + name);
		console.log("password:" + password);

		sequelize.transaction(function (t) {

			return User.create({
				uuid: uuid.v4(),
				name: name,
				password: password
			}, {transaction: t}).then(function (user) {
				console.log("create user :" + user);
				newUser = user;

				return Label.create({
					uuid: uuid.v4(),
					userId: user.id,
					name: "All"
				},{transaction: t}).then(function () {
					return Label.create({
					uuid: uuid.v4(),
					userId: user.id,
					name: "Today"
					},{transaction: t});
				});
			});
	  }).then(function () {
				if (newUser) {
					cb(null, newUser);
				} else {
					cb(exception('ServerError',"User signup failed"));
				}
	    }).catch(function (err) {
	      cb(err);
	    });
	};
};

module.exports.updateUser = function (body) {
	return function (cb) {
		var userId = this.session.id;
		var name = body.name;
		var password = body.password;

		return User.findOne({
			where: {
				id: userId
			}
		}).then(function (user){

			if (user) {
				if (name && name !== user.name) {
					 user.name = name;
				}
				if (password && password !== user.password) {
					 user.password = password;
				}
				return user.save().then(function() {
					cb(null, true);
				}).catch(cb);

			} else{
				cb(exception('BadRequest',"Dont have user"));
			}
		}).catch(cb);
	};
};

module.exports.deleteUser = function (userId) {
	return function (cb) {
		User.destroy({
			where: {
				id: userId
			}
		}).then(function (affectedRows) {
			console.log("删除条目:" + affectedRows);
			if(affectedRows === 1) {
				cb(null, true);
			} else {
				cb(null, false);
			}
		}).catch(cb);
	};
};

module.exports.getUserInfo = function (userId) {
	return function (cb) {
		User.find({
			where: {
				id: userId
			}
		}).then(function (user) {
			if (user) {
				cb(null, user);
			} else {
				cb(exception('BadRequest',"Dont have user"));
			}
		}).catch(cb);
	};
};

/*
	Label 相关
 */

module.exports.createLabel = function (userId, body) {
	return function (cb) {
		var label = {};
		label.uuid = uuid.v4();
		label.name = body.name;
		label.type = "user_create";
		label.userType = body.userType;
		label.userId = userId;

		Label.create(label).then(function(l){
			console.log('Create label:' + l);
			cb(null, l);
		}).catch(cb);
	};
};

module.exports.updateLabel = function (userId, labelUUID, body) {
	return function (cb) {

		Label.findOne({
			where: {
				uuid: labelUUID,
				userId: userId
			}
		}).then(function(l){
			if (l) {
				l.name = body.name;
				return l.save().then(function(){
					cb(null, true);
				}).catch(cb);
			} else {
				throw exception('BadRequest', 'Don not have label');
			}
		}).catch(cb);
	};
};

module.exports.deleteLabel = function (userId, labelUUID) {
	return function (cb) {
		Label.destroy({
			where: {
				userId: userId,
				uuid: labelUUID,
				type: {
					$ne:'default'
				}
			}
		}).then(function (affectedRows) {
			console.log("删除条目:" + affectedRows);
			if(affectedRows === 1) {
				cb(null, true);
			} else {
				cb(null, false);
			}
		}).catch(cb);
	};
};

module.exports.fetchAllLabels = function (userId) {
	return function (cb) {
		Label.findAll({
			where: {
				userId: userId
			}
		}).then(function(labels){
			cb(null, labels);
		}).catch(cb);
	};
};

module.exports.getLabelInfo = function (userId, labelUUID) {
	return function (cb) {
		Label.findOne({
			where: {
				userId: userId,
				uuid: labelUUID
			}
		}).then(function(label){
			if (label) {
				cb(null, label);
			} else {
				throw exception('BadRequest', 'Can not find label');
			}
		}).catch(cb);
	};
};
