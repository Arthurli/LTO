module.exports = {
	signUpUser: signUpUser,
	getUser: getUser,
	deleteUser: deleteUser,
	updateUser: updateUser
};

function* signUpUser () {
	console.log("signUpUser");
	this.status = 200;
}

function* getUser () {
	console.log("getUser");
	this.status = 200;
}

function* deleteUser () {
	console.log("deleteUser");
	this.status = 200;
}

function* updateUser () {
	console.log("updateUser");
	this.status = 200;
}