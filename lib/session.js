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

var checkSignin = function (ctx) {
	assert(ctx, "context required!");
	var session = ctx.session || {};
	if (session.id) {
		return true;
	}
	return false;
};

var saveUser = function (ctx, user) {
	assert(ctx && ctx.session, "context.session required!");
	assert(user && user.id, 'user required!');
	assert(user.publicId && user.name);

	ctx.session.id = user.publicId;
	ctx.session.username = user.name;
}

module.exports = {
	bind: bind,
	saveUser: saveUser,
	checkSignin: checkSignin
};