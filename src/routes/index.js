module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/',
			config : {
				handler: function(request, reply) {
					return reply("<h1>Server Is Ready!</h1>");
				}
			}
		},
	];
}();
