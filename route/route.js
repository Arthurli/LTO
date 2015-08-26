var route = require('koa-route');
var comments = require('./comments');
var group = require('./group');
var init = require('./init');
var label = require('./label');
var todo = require('./todo');
var user = require('./user');

module.exports = function (app) {
	/**
	 * 初始化方法
	 */
	app.use(route.post('/init', init.init));

	/**
	 * user相关方法
	 */
	app.use(route.get('/users/:uuid', user.getUser));
	app.use(route.post('/users', user.signUpUser));
	app.use(route.put('/users/:uuid', user.updateUser));
	app.use(route.delete('/users/:uuid', user.deleteUser));

	/**
	 * label相关方法
	 */
 	app.use(route.get('/labels', label.allLabels));
 	app.use(route.get('/labels/:uuid', label.getLabelInfo));
	app.use(route.post('/labels', label.createLabel));
	app.use(route.put('/labels/:uuid', label.updateLabel));
	app.use(route.delete('/labels/:uuid', label.deleteLabel));

	/**
	 * todo相关方法
	 */
	app.use(route.post('/todos', todo.createTodo));
	app.use(route.put('/todos/:uuid', todo.updateTodo));
	app.use(route.delete('/todos/:uuid', todo.deleteTodo));
	app.use(route.get('/todos/:todoUUID', todo.getTodoInfo));
	app.use(route.get('/todos/label/:labelUUID', todo.getTodoByLabel));
	app.use(route.get('/todos/date/:date', todo.getTodoByDate));

	/**
	 * group相关方法
	 */
	app.use(route.get('/groups', group.groupList));
	app.use(route.get('/groups/:uuid', group.getGroupInfo));
	app.use(route.post('/groups', group.addNewGroup));
	app.use(route.put('/groups/:uuid', group.updateGroup));
	app.use(route.delete('/groups/:uuid', group.removeGroup));

	/**
	 * comments相关方法
	 */
	app.use(route.post('/todos/:uuid/comments', comments.addNewComments));
	app.use(route.get('/todos/:uuid/comments', comments.getComments));
};