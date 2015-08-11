var Model = exports;

var sequelize = require('./db');

var User = require('./user');
var Label = require('./label');
var Todo = require('./todo');
var Group = require('./group');
var Comment = require('./comment');


Model.sequelize = sequelize;

Model.User = User;
Model.Label = Label;
Model.Todo = Todo;
Model.Group = Group;
Model.Comment = Comment;
