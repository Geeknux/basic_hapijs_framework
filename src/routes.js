var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var routesDIR = __dirname + '/routes';

var mod = {};

fs.readdirSync(routesDIR).forEach(function (file) {
 
  mod[path.join(routesDIR, file)] = require(path.join(routesDIR, file));

});

_.extend(module.exports, mod);
