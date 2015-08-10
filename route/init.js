module.exports = {
	init: init
};

function* init (next) {
	console.log("init");
	console.log("init123");

	this.session.id = "123";
	this.session.username = "username";

	this.status = 200;
}