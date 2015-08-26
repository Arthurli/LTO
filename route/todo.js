var mysql = require('../lib/mysql');
var exception = require('../lib/exception');

function* createTodo () {
	console.log("createTodo");

	var body = this.request.body;
	var todo = yield mysql.createTodo(this.session.id, body);
	var resBody = transformTodo(todo);

	this.response.body = resBody;

	this.status = 200;
}

function* getTodoInfo (todoUUID) {
	console.log("getTodoInfo");

	var todo = yield mysql.getTodoInfo(this.session.id, todoUUID);
	var resBody = transformTodo(todo);

	this.response.body = resBody;

	this.status = 200;
}

function* getTodoByLabel (labelUUID) {
	console.log("getTodoByLabel");

	var todos = yield mysql.fetchTodosBylabel(this.session.id, labelUUID);
	var body = [];
	for (var index in todos) {
		body.push(transformTodo(todos[index]));
	}
	this.response.body = body;
	this.status = 200;
}

function* getTodoByDate (date) {
	console.log("getTodoByDate");
	var todos = yield mysql.fetchTodosByDate(this.session.id, date);
	var body = [];
	for (var index in todos) {
		body.push(transformTodo(todos[index]));
	}
	this.response.body = body;
	this.status = 200;
}

function* deleteTodo (todoUUID) {
	console.log("deleteTodo");

	var success = yield mysql.deleteTodo(this.session.id, todoUUID);

	if (success) {
		this.status = 200;
	} else {
		throw exception('ServerError', '操作失败');
	}
}

function* updateTodo (todoUUID) {
	console.log("updateTodo");

	var body = this.request.body;
	var success = yield mysql.updateTodo(this.session.id, todoUUID, body);

	if (success) {
		this.status = 200;
	} else {
		throw exception('ServerError', '操作失败');
	}
}

function transformTodo(todo) {
	var resBody = {};
 	resBody.uuid = todo.uuid;
 	resBody.labelUUID = todo.labelUUID;
 	resBody.title = todo.title;
 	resBody.body = todo.body;
 	resBody.ownerUUID = todo.ownerUUID;
 	resBody.terminatorUUID = todo.terminatorUUID;
 	resBody.type = todo.type;
 	resBody.status = todo.status;
 	resBody.expiredAt = todo.expiredAt;

 	return resBody;
}

module.exports = {
	createTodo: createTodo,
	getTodoInfo: getTodoInfo,
	getTodoByLabel: getTodoByLabel,
	getTodoByDate: getTodoByDate,
	deleteTodo: deleteTodo,
	updateTodo: updateTodo
};