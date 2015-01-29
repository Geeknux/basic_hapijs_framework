var path = require('path');
var _ = require('underscore');


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}


exports.render_options = function(str, find_n_replace) {
	if(typeof find_n_replace === "object") _.extend(global_replace, find_n_replace);
	_.each(global_replace, function(value, key) {
		str = replaceAll("@@" + key, value, str);
	});
	return str;
}

exports.getExtension = function (filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

exports.capitalize = function(string) {
    var capitalized = string.replace(/^./g, function(char, pos) { return char.toUpperCase(); });
    return capitalized.replace(/\-(.)/g, function(_,char){ return char.toUpperCase(); } );
}
