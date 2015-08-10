var assert = require('assert');
var createError = require('http-errors');

var Codes = {
	BadRequest: 400,
	Unauthosized: 401,
	RequestFaildes: 402,
	Forbidden: 403,
	NotFound: 404,
	Conflict: 409,
	ServerError: 500,
	Success: 200
};

module.exports = function exception (code, msg) {
	var status = Codes[code];
	assert(status, 'No this code!');

	return createError(status, msg);
};