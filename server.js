var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

http.createServer(app).listen(1337, function() {
	console.log('Express server listening on port 1337');
});

app.post('/sms', function(req, res) {
	var twilio = require('twilio');
	var twiml = new twilio.twiml.MessagingResponse();
	twiml.message('The robots are coming!');
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
})

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	console.log(__dirname)
	res.sendFile(__dirname + '/disaster-relief.html');
})

