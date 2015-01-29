module.exports = function() {

	var env = process.env.NODE_ENV || 'development';
	var dbContants = databaseConfig();
	var appConstants = applicationConfig();

	var obj = {
		application : {
			url : appConstants[env]['url'],
			host : appConstants[env]['host'],
			port : appConstants[env]['port'],
		},
		database : {
			host     : dbContants[env]['host'],
			user     : dbContants[env]['user'],
			password : dbContants[env]['password'],
			database : dbContants[env]['database']
		},
		server : {
			defaultHost : 'http://127.0.0.1:8001/'
		}
	};

	function databaseConfig(){
		return {
			'production' : {
				'host' : '',
				'user' : '',
				'password' : '',
				'database' : ''
			},
			'development' : {
				'host' : 'http://127.0.0.1:8529',
				'user' : '',
				'password' : '',
				'database' : 'mydb'
			},
		};
	}

	function applicationConfig(){
		return {
			'production' : {
				'url' : '',
				'host' : '',
				'port' : ''
			},
			'development' : {
				'url' : 'http://127.0.0.1:8001/',
				'host' : '127.0.0.1',
				'port' : '8001'
			},

		};
	}

	return obj

}();

