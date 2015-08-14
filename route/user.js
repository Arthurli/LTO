var mysql = require('../lib/mysql');
var exception = require('../lib/exception');

function* signUpUser () {
	console.log("signUpUser");

	var body = this.request.body;
	var user = yield mysql.init(body);

	if (user && user.id && user.uuid) {
		throw exception('BadRequest', 'User 存在');
	}

	var newUser = yield mysql.createUser(body);
	if (newUser && newUser.id && newUser.uuid) {
		console.log("创建成功");
		this.session.id = newUser.id;
		this.session.uuid = newUser.uuid;

		var response = {};
		response.name = newUser.name;
		response.uuid = newUser.uuid;

		this.response.body = response;
		this.status = 200;
	} else {
		throw exception('ServerError', 'User 创建失败');
	}
}

function* getUser (uuid) {
	console.log("getUser");

	console.log("uuid:" + uuid);
	if (uuid !== this.session.uuid) {
		throw exception('Forbidden', '没有权限');
	}

	var user = yield mysql.getUserInfo(this.session.id);
	var response = {};
	response.name = user.name;
	response.uuid = user.uuid;

	this.response.body = response;
	this.status = 200;
}

function* deleteUser (uuid) {
	console.log("deleteUser");
	console.log("uuid:" + uuid);

	if (uuid !== this.session.uuid) {
		throw exception('Forbidden', '没有权限');
	}

	var success = yield mysql.deleteUser(this.session.id);

	if (success) {
		this.session = null;
		this.status = 200;
	} else {
		throw exception('BadRequest', '没有User');
	}
}

function* updateUser (uuid) {
	console.log("updateUser");
	console.log("uuid:" + uuid);

	if (uuid !== this.session.uuid) {
		throw exception('Forbidden', '没有权限');
	}

	var body = this.request.body;
	var success = yield mysql.updateUser(body);

	if (success) {
		this.status = 200;
	} else {
		throw exception('ServerError', 'User 更新失败');
	}
}

module.exports = {
	signUpUser: signUpUser,
	getUser: getUser,
	deleteUser: deleteUser,
	updateUser: updateUser
};
