//Server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoClient = require('mongodb').MongoClient;

var db;

// this sends the .html file to the browser, when browser calls GET
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/disaster-relief.html');
  var cursor = db.collection('quotes').find();
})

// this is for rendering the return values from the database into the html
app.set('view engine', 'ejs');

// this is for getting the contents of the html into the database
app.use(bodyParser.urlencoded({extended:true}))

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds034677.mlab.com:34677/ubiquitous-waddle', function(err, database) {
  if (err) return console.log(err)
  db = database;
  app.listen(3000, function() {
    console.log("listening on 3000");
  })
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
// Note: request and response are usually written as req and res respectively.

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   var shelterArray = [
//     { _id: 160, latitude: 233.0, longitude: -117.0, type: 'School'},
//     { _id: 161, latitude: 229.0, longitude: -100.0, type: 'Gym'},
//     { _id: 162, latitude: 210.0, longitude: -131.0, type: 'Church'}
//   ];
//   db.collection("Shelters").insertMany(shelterArray, function(err, res) {
//     if (err) throw err;
//     console.log(res);
//   });
//   var missingPersonArray = [
//     { _id: 210, name: "Harry Potter", age: 12, sex: 'Male'},
//     { _id: 211, name: "Katniss Everdeen", age: 23, sex: 'Female'},
//     { _id: 212, name: "Travis Pastrana", age: 3, sex: 'Male'}
//   ];
//   db.collection("Missing Persons").insertMany(missingPersonArray, function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     db.close();
//   });
// });
