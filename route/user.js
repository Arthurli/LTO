module.exports = {
	signUpUser: signUpUser,
	getUser: getUser,
	deleteUser: deleteUser,
	updateUser: updateUser
};

function* signUpUser () {
	console.log("signUpUser");
}

function* getUser () {
	console.log("getUser");
}

function* deleteUser () {
	console.log("deleteUser");
}

function* updateUser () {
	console.log("updateUser");
}