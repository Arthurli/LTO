var mysql = require('../lib/mysql');
var exception = require('../lib/exception');

function* init () {
	console.log("init");
	var body = this.request.body;
	var user = yield mysql.init(body);

	if (user && user.id && user.uuid) {
		console.log("存在账户");
		this.session.id = user.id;
		this.session.uuid = user.uuid;

		var response = {};
		response.name = user.name;
		response.uuid = user.uuid;

		this.response.body = response;
		this.status = 200;
	} else {
		throw exception('BadRequest', 'User 不存在');
	}
}

module.exports = {
	init: init
};