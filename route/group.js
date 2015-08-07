module.exports = {
	addNewGroup: addNewGroup,
	removeGroup: removeGroup,
	updateGroup: updateGroup,
	groupList: groupList,
	getGroupInfo: getGroupInfo
};

function* addNewGroup () {
	console.log("addNewGroup");
}

function* removeGroup () {
	console.log("removeGroup");
}

function* updateGroup () {
	console.log("updateGroup");
}

function* groupList () {
	console.log("groupList");
}

function* getGroupInfo () {
	console.log('getGroupInfo');
}