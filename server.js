var express = require('express');
var app = express();
app.use(express.static('public'));

var Datastore = require('nedb');
var db1 = new Datastore({filename: "data1.json", autoload: true});
var db2 = new Datastore({filename: "data2.json", autoload: true});

function updateComments(){

	db2.find({}, function(err, docs) {
		for (var i = 0; i < docs.length; i++) {
			console.log(docs[i].name + ": " + docs[i].comment);
			allData2.push(docs[i].name + ": " + docs[i].comment);
		}
	});
}


app.listen(3001, function () {
  console.log('Example app listening on port 3001');
});

app.get('/project1comments', function(req, res) {
	var dataToSave = {
		name: req.query.name,
		comment: req.query.comment
	};
	db1.insert(dataToSave, function (err, newDocs) {
		db1.find({}, function(err, docs) {
			res.send(docs);
		});
	});
});	

app.get('/project2comments', function(req, res) {
	var dataToSave = {
		name: req.query.name,
		comment: req.query.comment
	}
	db2.insert(dataToSave, function (err, newDocs) {
		db2.find({}, function(err, docs) {
			res.send(docs);
		});
	});
});	


