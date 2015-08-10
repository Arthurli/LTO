module.exports = {
	allLabels: allLabels,
	createLabel: createLabel,
	getLabelInfo: getLabelInfo,
	deleteLabel: deleteLabel,
	updateLabel: updateLabel
};

function* allLabels () {
	console.log("allLabels");
	this.status = 200;
}

function* createLabel () {
	console.log("createLabel");
	this.status = 200;
}

function* getLabelInfo () {
	console.log("getLabelInfo");
	this.status = 200;
}

function* deleteLabel () {
	console.log("deleteLabel");
	this.status = 200;
}

function* updateLabel () {
	console.log("updateLabel");
	this.status = 200;
}