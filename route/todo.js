module.exports = {
	createTodo: createTodo,
	getTodo: getTodo,
	deleteTodo: deleteTodo,
	updateTodo: updateTodo
};

function* createTodo () {
	console.log("createTodo");
	this.status = 200;
}

function* getTodo () {
	console.log("getTodo");
	this.status = 200;
}

function* deleteTodo () {
	console.log("deleteTodo");
	this.status = 200;
}

function* updateTodo () {
	console.log("updateTodo");
	this.status = 200;
}