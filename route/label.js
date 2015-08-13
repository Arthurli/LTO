var mysql = require('../lib/mysql');
var exception = require('../lib/exception');

function* allLabels () {
	console.log("allLabels");

	var alllabels = yield mysql.fetchAllLabels(this.session.id);
	var response = [];

	for (var index in alllabels) {
		var label = alllabels[index];
		var l = {};
		l.name = label.name;
		l.uuid = label.uuid;
		l.userType = label.userType;
		l.type = label.type;
		response.push(l);
	}
	this.response.body = response;
	this.status = 200;
}

function* createLabel () {
	console.log("createLabel");

	var body = this.request.body;
	var label = yield mysql.createLabel(this.session.id, body);

	if (label) {
		var l = {};
		l.name = label.name;
		l.uuid = label.uuid;
		l.userType = label.userType;
		l.type = label.type;
		this.response.body = l;
		this.status = 200;
	} else {
		throw exception('ServerError', 'Create label error');
	}
}

function* getLabelInfo (labelUUID) {
	console.log("getLabelInfo");

	var label = yield mysql.getLabelInfo(this.session.id, labelUUID);
	if (label) {
		var l = {};
		l.name = label.name;
		l.uuid = label.uuid;
		l.userType = label.userType;
		l.type = label.type;

		this.response.body = l;
		this.status = 200;
	} else {
		throw exception('ServerError', 'can not fetch label info');
	}
}

function* deleteLabel (labelUUID) {
	console.log("deleteLabel");
	var success = yield mysql.deleteLabel(this.session.id, labelUUID);
	if (success) {
 		this.status = 200;
 	} else {
 		throw exception('ServerError', 'can not delete label');
 	}
}

function* updateLabel (labelUUID) {
	console.log("updateLabel");
	var body = this.request.body;
	var success = yield mysql.updateLabel(this.session.id, labelUUID, body);
	if (success) {
 		this.status = 200;
 	} else {
 		throw exception('ServerError', 'can not delete label');
 	}
}

module.exports = {
	allLabels: allLabels,
	createLabel: createLabel,
	getLabelInfo: getLabelInfo,
	deleteLabel: deleteLabel,
	updateLabel: updateLabel
};