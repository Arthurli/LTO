var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var route = require('./route/route');
var session = require('./lib/session');
var cookieHander = require('./middleware/cookieHander');
var permissionHander = require('./middleware/permissionHander');

console.log("Let's go");

var app = koa();
app.keys = ['LTO'];

app.use(bodyParser());
app.use(cookieHander());
console.log(session);
session.bind(app);
app.use(permissionHander());

route(app);

var server = app.listen(3000, function () {
	console.log("Began listen 3000 port");
});

module.exports = server;