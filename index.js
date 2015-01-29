// Constant variables
global.__baseDIR = __dirname + '/';

// Load Differect parts of APP
var constants = require('./src/config/constants.js');
var Routes = require('./src/routes.js');
var _server  = require('./src/server.js');
var Server = _server.CreateServer();

for (var route in Routes) {
	Server.route(Routes[route]);
}


