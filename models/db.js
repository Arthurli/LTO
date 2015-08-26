var Sequelize = require('sequelize');

var config = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  db: "lto",
  logging: false,
  dialect: "mysql",
  pool: {
    max: 1,
    min: 0,
    idle: 30000
  }
};

module.exports = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  port: config.port,
  pool: config.pool,
  dialect: config.dialect,
  logging: true,
  define: {
    underscored: true
  }
});
