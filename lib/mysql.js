var async = require('async');
var uuid = require('node-uuid');
var Sequelize = require('sequelize');

var utils = require('./utils');
var exception = require('./exception');
var sequelize = require('../models/db');

var model = require('../models');
var User = require('../models/user');
var Label = require('../models/label');
var Todo = require('../models/todo');
var Group = require('../models/group');
var TodoComment = require('../models/comment');
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
				l.name = body.name ? body.name : l.name;
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

/**
 * Todo 相关方法
 */

module.exports.createTodo = function (userId, body) {
	return function (cb) {
		var todo = {};
		todo.uuid = uuid.v4();
		todo.userId = userId;
		todo.labelUUID = body.labelUUID;
		todo.title = body.title;
		todo.body = body.body;
		todo.ownerUUID = body.ownerUUID;
		todo.terminatorUUID = body.terminatorUUID;
		todo.expiredAt = body.expiredAt;

		todo.type = "user";
		todo.status = "done";

		Todo.create(todo).then(function(t){
			console.log('Create todo:' + t);
			cb(null, t);
		}).catch(cb);
	};
};

module.exports.deleteTodo = function (userId, todoUUID) {
	return function (cb) {
		Todo.destroy({
			where: {
				userId: userId,
				uuid: todoUUID
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

module.exports.updateTodo = function (userId, todoUUID, body) {
	return function (cb) {

		Todo.findOne({
			where: {
				userId: userId,
				uuid: todoUUID
			}
		}).then(function(t){

			if (t) {
				t.title = body.title ? body.title : t.title;
				t.labelUUID = body.labelUUID ? body.labelUUID : t.labelUUID;
				t.body = body.body ? body.body : t.body;
				t.status = body.status ? body.status : t.status;
				t.expiredAt = body.expiredAt ? body.expiredAt : t.expiredAt;

				return t.save().then(function(){
					cb(null, true);
				}).catch(cb);
			} else {
				throw exception('BadRequest', 'Don not have todo');
			}
		}).catch(cb);
	};
};

module.exports.getTodoInfo = function (userId, todoUUID) {
	return function (cb) {
		Todo.findOne({
			where: {
				userId: userId,
				uuid: todoUUID
			}
		}).then(function(todo){
			if (todo) {
				cb(null, todo);
			} else {
				throw exception('BadRequest', 'Can not find todo');
			}
		}).catch(cb);
	};
};

module.exports.fetchTodosBylabel = function (userId, labelUUID) {

	return function (cb) {

		Label.findOne({
			where: {
				userId: userId,
				uuid: labelUUID
			}
		}).then(function(label){
			if (label) {

				if (label.name === "All") {
					return Todo.findAll({
										where: {
											userId: userId,
										}
									}).then(function(ts){
										cb(null, ts);
									}).catch(cb);
				} else if (label.name === "Today") {
					var today = new Date();
					var dateString = geFormatDate(today);

					return Todo.findAll({
										where: {
											userId: userId,
											expiredAt: dateString
										}
									}).then(function(ts){
										cb(null, ts);
									}).catch(cb);
				} else {
					Todo.findAll({
						where: {
							userId: userId,
							labelUUID: labelUUID
						}
					}).then(function(ts){
						cb(null, ts);
					}).catch(cb);
				}
			} else {
				throw exception('BadRequest', 'Can not find label');
			}
		}).catch(cb);

	};
};

module.exports.fetchTodosByDate = function (userId, date) {

	return function (cb) {
		Todo.findAll({
			where: {
				userId: userId,
				expiredAt: date
			}
		}).then(function(ts){
			cb(null, ts);
		}).catch(cb);
	};
};

/**
 * Comments 相关方法
 */
module.exports.createComment = function (userId, todoUUID, body) {
	return function (cb) {
		var comment = {};
		comment.uuid = uuid.v4();
		comment.todoUUID = todoUUID;
		comment.userName = body.userName;
		comment.body = body.body;

		TodoComment.create(comment).then(function(c){
			console.log('Create comment:' + c);
			cb(null, c);
		}).catch(cb);
	};
};

module.exports.getAllComments = function (userId, todoUUID) {
	return function (cb) {
		TodoComment.findAll({
			where: {
				todoUUID: todoUUID
			}
		}).then(function(comments){
			cb(null, comments);
		}).catch(cb);
	};
};

function geFormatDate(date) {
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * Group 相关的方法
 */
module.exports.createGroup = function (userId, body) {
	return function(cb) {
		var group = {};
		group.uuid = uuid.v4();
		group.name = body.name;
		return User.find({
			where: {
				id: userId,
			}
		}).then(function (user) {
			console.log(user);
			group.ownerUUID = user.uuid;

			return Group.create(group).then(function(g) {

				console.log(g);
				return g.addUsers(user).then(function(){
					cb(null, g);
				}).catch(cb);
			}).catch(cb);
		}).catch(cb);
	};
};

module.exports.removeGroup = function (userId, groupUUID) {
	
};

module.exports.updateGroup = function (userId, groupUUID, body) {
	
};

module.exports.getGroupList = function (userId) {

	return  User.findOne({
		where: {
			id: userId
		}
	}).then(function (user){
		return user.getGroups();
	})
	.then(function(result){
		if (result) {
			console.log(result);
			return result;
		} else {
			console.log("error!!!!!!!!!!");
			throw new Error("error");
		}
	}).catch(function(error) {
     throw new Error(error);
	});
};

module.exports.getGroupInfo = function (userId, groupUUID) {
	return  User.findOne({
		where: {
			id: userId
		}
	}).then(function (user){
		return user.getGroups({
			where: {
				uuid: groupUUID
			}
		});
	}).then(function (result){
		if (result) {
			console.log(result);
		return result[0];
		} else {
			console.log("----------------------");
			throw new Error("error");
		}
		
	}).catch(function (error) {
		throw error;
	});
};

