module.exports = {
	addNewComments: addNewComments,
	getComments: getComments
};

function* addNewComments () {
	console.log("addNewComments");
	this.status = 200;
}

function* getComments () {
	console.log("getComments");
	this.status = 200;
}