const preLogPages = ['/', '/login', '/registration'];
const postLogPages = ['/logout'];
const clientPages = ['/clientInventory'];
const adminPages = ['/getAllInventoryItems', '/addItem'];

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const rootPath = require('app-root-dir').get();
const app = express();
const meld = require('meld');
let bodyParser = require('body-parser');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));

// will be removed later
const desktopRepo = require(rootPath +
  '/DataSource/Repository/DesktopRepository.js');

// this will be removed (it is here only for testing purposes)
desktopRepo.save2('object');

const Controller = require(rootPath + '/Controllers/controller');
let controller = new Controller();

// allows use of static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'top',
  exists: false,
  isAdmin: false,
  resave: false,
  saveUninitialized: true,
}));

// let sess;
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

// loading the home page
app.get('/', function(req, res) {
  if (req.session.exists) {
    console.log('already logged in, redirecting to inventory');
    res.redirect('/getAllInventoryItems');
  } else res.render('home');
});

// getting the login page
app.get('/login', function(req, res) {
  if (req.session.exists) {
    console.log('already logged in, redirecting to inventory');
    res.redirect('/getAllInventoryItems');
  } else {
res.render('login');
}
});

// getting the registration page
app.get('/registration', function(req, res) {
  if (req.session.exists) {
      console.log('already logged in, redirecting to inventory');
      res.redirect('/getAllInventoryItems');
  } else {
      res.render('registration');
  }
});

// getting the add item page
app.get('/addItem', function(req, res) {
  if (req.session.exists) {
    res.render('addItem');
  } else {
    console.log('login error');
    res.redirect('/');
  }
});

// this should be implemented in the controller
app.get('/logout', function(req, res) {
  if (req.session.exists) {
    req.session.destroy();
    res.redirect('/');
  } else {
    console.log('login error');
    res.redirect('/');
  }
});

// getting the inventory from the database
app.get('/getAllInventoryItems', function(req, res) {
  if (req.session.exists) {
    controller.getAllInventory(req, res);
  } else {
    console.log('login error');
    res.redirect('/login');
  }
});

// getting the client inventory from the database
app.get('/clientInventory', function(req, res) {
  if (req.session.exists) {
    controller.getAllInventory(req, res);
    console.log('Successs');
  } else {
    console.log('login error');
    res.redirect('/login');
  }
});

// making the registration request
app.post('/registrationRequest', function(req, res) {
  controller.registrationRequest(req, res);
});

// making the login request
app.post('/loginRequest', function(req, res) {
   controller.loginRequest(req, res);
  });

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

meld.around(app, 'get', function(methodCall) {
  const dest = methodCall.args[0];
  if (typeof dest != 'string') {
    return methodCall.proceed();
  }
  console.log('');
  console.log(app);
  console.log('method callgrp: ' + methodCall.args);
  console.log('first arg' + methodCall.args[0]);
  console.log('session:' + app.session); // undefined
  const sessionStats = app.session;
  const c1 = preLogPages.indexOf(dest)>-1 && !sessionStats;
  const c2 = postLogPages.indexOf(dest)>-1 && sessionStats.exists;
  const c3 = clientPages.indexOf(dest)>-1 && !sessionStats.isAdmin;
  const c4 = adminPages.indexOf(dest)>-1 && sessionStats.isAdmin;
  if (c1 || c2 || c3 || c4) {
    console.log('all normal');
  } else if (sessionStats && sessionStats.isAdmin) {
    console.log('back to the admin cage');
    methodCall.args[0] = '/getAllInventoryItems';
  } else if (sessionStats) {
    console.log('back to the peasant cage');
    methodCall.args[0] = '/clientInventory';
  } else {
    console.log('backgroundMagic');
  }
  console.log('your method call got captured by a smooth criminal in index.js');
  return methodCall.proceed();
});
