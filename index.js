var koa = require('koa');
var route = require('./route/route');

console.log("Let's go");

var app = koa();
app.keys = ['LTO'];

route(app);

var server = app.listen(3000, function () {
	console.log("Began listen 3000 port");
});

module.exports = server;