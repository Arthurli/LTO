var assert = require('assert');
var session = require('koa-generic-session');
var RedisStore = require('koa-redis');

var redisConfig = {
	host: "localhost",
  port: 6379,
  password: "1234124124124"
};

var sessionConfig = {
	key: "ltosession",
  httpOnly: false,
  secure: false,
  domain: "test.ltosession.com",
  cookieExpire: 2592000000,
  sessionExprire: 2592000000
};

var bind = function (app) {
	assert(app, "app require");
	assert(!app.binded, "repeat binding");

	app.binded = true;
	app.use(session({
		store: new RedisStore(redisConfig),
		cookie: {
			maxage: sessionConfig.cookireExpire
		}
	}));
};

module.exports = {
	bind: bind
};