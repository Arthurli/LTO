var mysql = require('../lib/mysql');
var exception = require('../lib/exception');

module.exports = {
	addNewGroup: addNewGroup,
	removeGroup: removeGroup,
	updateGroup: updateGroup,
	groupList: groupList,
	getGroupInfo: getGroupInfo
};

function* addNewGroup () {
	console.log("addNewGroup");
	var body = this.request.body;
	var group = yield mysql.createGroup(this.session.id, body);

	this.response.body = transformGroup(group);
	this.status = 200;
}

function* removeGroup (uuid) {
	console.log("removeGroup");
	var success = yield mysql.removeGroup(this.session.id, uuid);
	if (success) {
		this.status = 200;
	} else {
		throw exception('ServerError', '操作失败');
	}
}

function* updateGroup (uuid) {
	console.log("updateGroup");
	var body = this.request.body;
	var success = yield mysql.updateGroup(this.session.id, uuid, body);

	if (success) {
		this.status = 200;
	} else {
		throw exception('ServerError', '操作失败');
	}
}

function* groupList () {
	console.log("groupList");

	var groups = yield mysql.getGroupList(this.session.id);
	var r = [];

	for (var index in groups) {
		r.push(transformGroup(groups[index]));
	}

	this.response.body = r;
	this.status = 200;
}

function* getGroupInfo (uuid) {
	console.log('getGroupInfo');

	var group = yield mysql.getGroupInfo(this.session.id, uuid);

	this.response.body = transformGroup(group);

	this.status = 200;
}

function transformGroup(group) {
	var resBody = {};
 	resBody.uuid = group.uuid;
 	resBody.ownerUUID = group.ownerUUID;
 	resBody.name = group.name;

 	return resBody;
}