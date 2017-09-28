const express = require('express');
const app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //allows use of static pages 

app.get('/', function(req, res) {
  res.sendFile('public/testpage.html', {root: __dirname});
});

app.get('/login', function(req, res) {
  res.sendFile('public/login.html', {root: __dirname});
});

app.get('/registration', function(req, res) {
  res.sendFile('public/registration.html', {root: __dirname});
});

app.get('/inventory', function(req, res) {
  res.sendFile('public/inventory.html', {root: __dirname});
});

app.get('/addItem', function(req, res) { 
  res.sendFile('public/addItem.html', {root: __dirname});
});

app.get('/database', function(req, res) {
  res.sendFile('public/database.html', {root: __dirname});
});

app.get('/admin', function(req, res) {
  res.sendFile('public/admin.html', {root: __dirname});
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
