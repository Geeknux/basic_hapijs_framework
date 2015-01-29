(function(){
	var _ = require('underscore');
	var path = require('path');
	var fs = require('fs');
	var constants = require(__baseDIR + 'src/config/constants.js');
	var arangoDB = require('arangojs');
	var modelsDIR = __dirname + '/models';
	var DB = null;
	var DB_models = {};
	
	Models = function() {
		console.log("Start To Connect To DB.");
		DB = Models.ConnectDB();
		if(!_.isUndefined(DB)) {
			Models.ChangeDB();	
		}
	}

	Models.ChangeDB = function(dbName) {
		dbName = !_.isUndefined(dbName) ? dbName : constants.database['database'];
		console.log("Change To DB `" + dbName + "`");
		DB.database(dbName, true, function (err, database){
			if (!_.isNull(err)) {
				console.log("Can't Connect To DB. Error:" + err);
			} else {
				console.log("DB Connected Successfully.");
				console.log("Loading Models...");
				DB = database;
				Models.LoadModels();
			}
		});
		//DB.use("/" + dbName);

	}

	Models.ConnectDB = function() {
		console.log("Trying to connect to DB `" + constants.database['host'] + "`...");
		try {
			//this._connection = new Connection(constants.database['host']);
			//return arango.Connection(constants.database['host']);
			return new arangoDB(constants.database['host']);
 		} catch(e) {
 			console.log("Can't connect to DB");
 			console.log(e);
 		}
	}

	Models._filterUserCollections = function(Collections) {
		var models_names = [];

		for(var collection in Collections) {
			models_names.push(Collections[collection].name);
		}

		return models_names;
	}

	Models.DeleteCollection = function(CollectionName) {
		DB.dropCollection(CollectionName,function(err,ret){
			if(_.isNull(err)) {
				console.log("Collection `%s` Deleted Successfully.", CollectionName)
			} else {
				console.log("error(%s): %j", err, ret);
			}
		});
	}

	Models.CreateCollection = function(CollectionName) {
		DB.createCollection(CollectionName,function(err,ret){
			if(_.isNull(err)) {
				console.log("Collection `%s` has been created.", CollectionName);
			} else {
				console.log("error(%s): %j", err, ret);
			}
		});
	}

	Models.LoadModels = function() {
		DB.collections(true, function(err, res){
			if(_.isNull(err)) {
				var current_collections = Models._filterUserCollections(res);
				fs.readdirSync(modelsDIR).forEach(function (file) {
					var model_name = file.slice(0, -3);
					DB_models[model_name] = require(path.join(modelsDIR, file))(DB);
					if(_.indexOf(current_collections, DB_models[model_name].getCollectionName())<0) {
						Models.CreateCollection(DB_models[model_name].getCollectionName());
					}
				});
				_.extend(module.exports, DB_models);
				console.log("Server Is Ready");
			} else {
				console.log("Can't Load Collections");
				console.log(err);
			}
		});
	}

	Models();
})();
