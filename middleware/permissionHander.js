var exception = require('../lib/exception');

module.exports = function () {
	return function* (next) {
		console.log(this.request.url);
		console.log(this.request.path);
		console.log(this.request.method);

		if (['/init', '/users'].indexOf(this.request.path) === -1) {
			console.log('开始验证是否授权');
			if (!this.session.id || !this.session.username) {
				throw exception('Forbidden', "没有授权");
			}
		}
		yield* next;
	};
};
