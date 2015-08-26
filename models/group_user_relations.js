var Sequelize = require('sequelize');
var sequelize = require('./db');

module.exports = sequelize.define('group_user_relations', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    field: 'user_id',
    type: Sequelize.INTEGER(11).UNSIGNED,
    references: {
        model: "user",
        key: 'id',
      }
  },
  groupId:  {
    field: 'group_id',
    type: Sequelize.INTEGER(11).UNSIGNED,
    references: {
        model: "group",
        key: 'id',
      }
  }
}, {
  createdAt: false,
  updatedAt: false,
  tabelName: 'group_user_relations'
});