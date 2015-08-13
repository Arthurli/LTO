var crypto = require('crypto');

var ossKey = {
    accessKeyId: "Kg6uNfyginIWYzNk",
    secretAccessKey: "PjZR76SAEZI3fBC26t0YUDlekyjARC",
    endpoint: "http://oss-cn-qingdao.aliyuncs.com",
    apiVersion: "2013-10-15",
    bucket: "mailcup-test"
};

module.exports.md5 = function (str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

module.exports.sha256 = function (str) {
	return crypto.createHash('sha256').update(str).digest('hex');
};

exports.cram_md5 = function (password) {
	return password;
};

exports.hmacSha1 = function (message) {
	if (typeof message === 'string') {
		message = new Buffer(message);
	}
	return crypto.createHmac('sha1', ossKey).update(message).digest('base64');
};

exports.random = function (low, high) {
	return parseInt(Math.random() * (high - low) + low, 10);
};

exports.duplicateRemoval = function (array, identify) {
	var index, temp = {}, result = [];
	for (index = 0; index< array.length && array.length; index++) {
		if (identify) {
			if (!temp[array[index][identify]]) {
				result.push(array[index]);
				temp[array[index][identify]] = true;
			}
		} else {
			if (!temp[array[index]]) {
				result.push(array[index]);
				temp[array[index]] = true;
			}
		}
	}

	return result.length ? result : null;
};

