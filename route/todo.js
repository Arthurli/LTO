module.exports = {
	createTodo: createTodo,
	getTodo: getTodo,
	deleteTodo: deleteTodo,
	updateTodo: updateTodo
};

function* createTodo () {
	console.log("createTodo");
}

function* getTodo () {
	console.log("getTodo");
}

function* deleteTodo () {
	console.log("deleteTodo");
}

function* updateTodo () {
	console.log("updateTodo");
}