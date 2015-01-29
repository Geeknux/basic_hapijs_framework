var Hapi = require('hapi');
var Scooter = require('scooter');

var constants = require(__baseDIR + 'src/config/constants.js');
module.exports = myFramework;

function myFramework() { };
myFramework.CreateServer = function (){

	var serverConfig = {
	    cors: {
	        origin: ['http://127.0.0.1:8000'],
	    }
	};

	var server = new Hapi.Server();
	server.connection({ host: constants.application['host'], port: constants.application['port'] });

	server.register(Scooter, function(err) {
		server.start(function(){
			console.log("Server Start At: " + constants.application['host'] + ":" + constants.application['port']);
		});
	});

	return server;
};
