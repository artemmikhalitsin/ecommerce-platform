const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const rootPath = require('app-root-dir').get();
const app = express();
let bodyParser = require('body-parser');

app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));

const Controller = require(rootPath + '/Controllers/controller');
let controller = new Controller();

// allows use of static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'top',
  exists: false,
  resave: false,
  saveUninitialized: true,
}));
// let sess;

app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  if (req.session.exists) {
    console.log('already logged in, redirecting to inventory');
    res.redirect('/getAllInventoryItems');
  } else res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.get('/inventory', function(req, res) {
  if (req.session.exists) {
    res.render('inventory2');
  } else {
    console.log('login error');
    res.redirect('/');
  }
});

app.get('/addItem', function(req, res) {
  if (req.session.exists) {
    res.render('addItem');
  } else {
    console.log('login error');
    res.redirect('/');
  }
});

app.get('/database', function(req, res) {
  res.render('database');
});

app.get('/admin', function(req, res) { // leads to empty file
  res.render('admin');
});

app.get('/logout', function(req, res) {
  if (req.session.exists) {
    req.session.destroy();
    res.redirect('/');
  } else {
    console.log('login error');
    res.redirect('/');
  }
});

app.get('/navbar_test', function(req, res) {
  res.render('navbar_test');
});

app.get('/getAllInventoryItems', function(req, res) {
  if (req.session.exists) {
    controller.getAllInventoryItems(req, res);
  } else {
    console.log('login error');
    res.redirect('/');
  }
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
