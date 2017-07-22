var http = require('http');
var express = require('express');
var twilio = require('twilio');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;
var app = express();

MongoClient.connect('mongodb://jdum66:rIc364det@ds034677.mlab.com:34677/ubiquitous-waddle', function(err, database) {
	if (err) return console.log(err)
	db = database;
	app.listen(1337, function() {
		console.log('Express server listening on port 1337');
	})
	var missingPersonArray = [
			{ _id: 210, name: "Harry Potter", age: 12, sex: 'Male'},
			{ _id: 211, name: "Katniss Everdeen", age: 23, sex: 'Female'},
			{ _id: 212, name: "Spongebob Squarepants", age: 3, sex: 'Male'}
		];
		db.collection("MissingPersons").insertMany(missingPersonArray, function(err, res) {
			if (err) throw err;
			console.log(res);
			db.close();
		});
	var shelterArray = [
	    { _id: 160, latitude: 233.0, longitude: -117.0, type: 'School'},
	    { _id: 161, latitude: 229.0, longitude: -100.0, type: 'Gym'},
	    { _id: 162, latitude: 210.0, longitude: -131.0, type: 'Church'}
	  ];
	  db.collection("Shelters").insertMany(shelterArray, function(err, res) {
	    if (err) throw err;
	    console.log(res);
	  });
})


// this is for getting the contents of the html into the database
app.use(bodyParser.urlencoded({extended:true}))

app.post('/sms', function(req, res) {
	var twilio = require('twilio');
	var twiml = new twilio.twiml.MessagingResponse();
	twiml.message('The robots are coming!');
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());

	db.collection('sms').save()

})

// this reads from HTML POST call
app.post('/shelters', function(req, res) {
	db.collection('Shelters').save(req.body, function(err, result) {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

// this reads from HTML POST call
app.post('/missingPersons', function(req, res) {
	db.collection('MissingPersons').save(req.body, function(err, result) {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

// this reads from HTML POST call
app.post('/hazards', function(req, res) {
	db.collection('Hazards').save(req.body, function(err, result) {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	console.log(__dirname)
	res.sendFile(__dirname + '/disaster-relief.html');
})

app.get('shelters'), function(req, res) {
	db.collection('Shelters').find().toArray(function(err, results) {
		console.log(results);
		res.json(collection);
	})
}

app.get('/missingPersons', function(req, res) {
	db.collection('MissingPersons').find().toArray(function(err, results) {
		console.log(results);
		res.json(collection);
	});
})
