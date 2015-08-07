module.exports = {
	allLabels: allLabels,
	createLabel: createLabel,
	getLabelInfo: getLabelInfo,
	deleteLabel: deleteLabel,
	updateLabel: updateLabel
};

function* allLabels () {
	console.log("allLabels");
}

function* createLabel () {
	console.log("createLabel");
}

function* getLabelInfo () {
	console.log("getLabelInfo");
}

function* deleteLabel () {
	console.log("deleteLabel");
}

function* updateLabel (next) {
	console.log("updateLabel");
	yield next;
}