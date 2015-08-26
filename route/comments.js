var mysql = require('../lib/mysql');

function* addNewComments (todoUUID) {
	console.log("addNewComments");

	var body = this.request.body;
	var comment = yield mysql.createComment(this.session.id, todoUUID, body);

	var resBody = transformComments(comment);

	this.response.body = resBody;
	this.status = 200;
}

function* getComments (todoUUID) {
	console.log("getComments");

	var comments = yield mysql.getAllComments(this.session.id, todoUUID);
	var body = [];
	for (var index in comments) {
		var resBody = transformComments(comments[index]);
		body.push(resBody);
	}

	this.response.body = body;
	this.status = 200;
}

function transformComments(comment) {
	var resBody = {};
	resBody.uuid = comment.uuid;
	resBody.todoUUID = comment.todoUUID;
	resBody.userName = comment.userName;
	resBody.body = comment.body;

	return resBody;
}

module.exports = {
	addNewComments: addNewComments,
	getComments: getComments
};