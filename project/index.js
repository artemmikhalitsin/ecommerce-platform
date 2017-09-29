const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');


const app = express();

app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('testpage');
});

app.get('/example', function(req, res) {
  res.render('example', { text: "What's popping?"});
})

app.get('/test', function(req, res) {
  res.render('hbs_test', {body: "Nice bod, bro"})
})

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.get('/inventory', function(req, res) {
  res.render('inventory');
});

app.get('/database', function(req, res) {
  res.render('database');
});

app.get('/admin', function(req, res) {
  res.render('admin');
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
