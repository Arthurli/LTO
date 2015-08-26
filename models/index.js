var Model = exports;

var sequelize = require('./db');

var User = require('./user');
var Label = require('./label');
var Todo = require('./todo');
var Group = require('./group');
var Comment = require('./comment');
var GroupUserRelation = require('./group_user_relations');

User.hasMany(Label, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

User.belongsToMany(Group, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  through: {
    model: GroupUserRelation
  }
});

Group.belongsToMany(User, {
  foreignKey: 'groupId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  through: {
    model: GroupUserRelation
  }
});

Model.sequelize = sequelize;

Model.User = User;
Model.Label = Label;
Model.Todo = Todo;
Model.Group = Group;
Model.Comment = Comment;
Model.GroupUserRelation = GroupUserRelation;
