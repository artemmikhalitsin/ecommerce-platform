const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const rootPath = require('app-root-dir').get();

const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
// let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));

const Controller = require(rootPath + '/Controllers/controller');
let controller = new Controller();

// allows use of static pages
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.get('/inventory', function(req, res) {
  res.render('inventory2');
});

app.get('/addItem', function(req, res) {
  res.render('addItem');
});

app.get('/database', function(req, res) {
  res.render('database');
});

app.get('/admin', function(req, res) {
  res.render('admin');
});

app.get('/getAllInventoryItems', function(req, res) {
  controller.getAllInventoryItems(req, res);
});

// MOVE TO CONTROLLER WHEN IT'S THERE
app.post('/registrationRequest', function(req, res) {
  controller.registrationRequest(req, res);
});

app.post('/loginRequest', function(req, res) {
  controller.loginRequest(req, res);
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
