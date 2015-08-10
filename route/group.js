module.exports = {
	addNewGroup: addNewGroup,
	removeGroup: removeGroup,
	updateGroup: updateGroup,
	groupList: groupList,
	getGroupInfo: getGroupInfo
};

function* addNewGroup () {
	console.log("addNewGroup");
	this.status = 200;
}

function* removeGroup () {
	console.log("removeGroup");
	this.status = 200;
}

function* updateGroup () {
	console.log("updateGroup");
	this.status = 200;
}

function* groupList () {
	console.log("groupList");
	this.status = 200;
}

function* getGroupInfo () {
	console.log('getGroupInfo');
	this.status = 200;
}