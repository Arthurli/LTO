var urlencode = require("urlencode");

module.exports = function () {
	return function* (next) {
		this.request.header.cookie = this.request.header.cookie && urlencode.decode(this.request.header.cookie).replace(/"/g, '');
		yield next;
		if (['/init', '/users'].indexOf(this.request.path) !== -1) {
			this.body = this.response.header['set-cookie'] || this.body;
		}
	};
};