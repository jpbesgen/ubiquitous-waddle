var http = require('http');
var express = require('express');
var twilio = require('twilio');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

var db;
var app = express();


mongoClient.connect('mongodb://jdum66:rIc364det@ds034677.mlab.com:34677/ubiquitous-waddle', function(err, database) {
	if (err) return console.log(err)
	db = database;
	app.listen(1337, function() {
		console.log('Express server listening on port 1337');
	})
})


// this is for getting the contents of the html into the database
app.use(bodyParser.urlencoded({extended:true}))

app.post('/sms', function(req, res) {
	var twilio = require('twilio');
	var twiml = new twilio.twiml.MessagingResponse();
	twiml.message('The robots are coming!');
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
})

// this reads from HTML POST call
app.post('/shelters', function(req, res) {
	db.collection('shelters').save(req.body, function(err, result) {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

// this reads from HTML POST call
app.post('/missingPersons', function(req, res) {
	db.collection('missingPersons').save(req.body, function(err, result) {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

// this reads from HTML POST call
app.post('/hazards', function(req, res) {
	db.collection('hazards').save(req.body, function(err, result) {
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

app.get('/missingPersons', function(req, res) {
	db.collection('missingPersons').find().toArray(function(err, results) {
		console.log(results);
		res.json(collection);
	});
})
