const preLogPages = ['/home', '/login', '/registration'];
const postLogPages = ['/logout'];
const clientPages = ['/clientInventory'];
const adminPages = ['/getAllInventoryItems', '/addItem'];

const fs = require('fs');
const logger = fs.createWriteStream('log.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
});

const stringy = require('stringy');
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

app.get('/addProduct', function(req, res) {
  if (req.session.exists) {
    res.render('inventory/new-product');
  } else {
    res.redirect('/login');
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

// making the login request
app.post('/inventoryAction', function(req, res) {
     controller.inventoryAction(req, res);
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

meld.before(Controller, /[a-z]*.nventory[a-zA-z]*/, function(req, res) {
  console.log('capturing inventory access, testing access');
  console.log(req.body);
});

// meld.around(app, 'render', function(page) {
//   console.log('caught res! :' + page.args);
//   return page.proceed();
// });

meld.around(controller, 'getAllInventory', function(methodCall) {
  console.log('caughtPage');
  console.log(methodCall.args);
  logger.write(stringy.stringify(methodCall.args));
  logger.end();
  // if (methodCall.req.session.exists) {
  //   return methodCall.proceed;
  // } else {
  //   return methodCall.res.redirect('/login');
  // }
});

// meld.around(app, 'render', function(methodCall) {
//   const dest = '/'+methodCall.args[0];
//   // console.log('dest: '+ dest);
//   if (typeof dest != 'string') {
//     console.log('destination not a string');
//     return methodCall.proceed();
//   }
//   // if ((methodCall.args[0] === 'env') |
//   //     (methodCall.args[0] === 'etag fn') |
//   //     (methodCall.args[0] === 'views') |
//   //     (methodCall.args[0] === 'view') |
//   //     (methodCall.args[0] === 'view engine')) {
//   //     console.log('method ignored, args[0]: '+ methodCall.args[0]);
//   //   return methodCall.proceed();
//   // }
//   // console.log('');
//    console.log('context: ' + methodCall.target.toString());
//    console.log('contex params: ');
//    console.log('method callgrp: ' + methodCall.args);
//    console.log('method name: ' + methodCall.method);
//    console.log('session:' + app.session); // undefined
//    console.log('dest: ' + dest);
//   //  const sessionStats = methodCall.target.arguments[0].session;
//   const c1 = preLogPages.indexOf(dest)>-1 &&
//     (typeof sessionStats === 'undefined');
//   const c2 = postLogPages.indexOf(dest)>-1 && sessionStats.exists;
//   const c3 = clientPages.indexOf(dest)>-1 && !sessionStats.isAdmin;
//   const c4 = adminPages.indexOf(dest)>-1 && sessionStats.isAdmin;
//   // console.log('prelogIndex: ' + preLogPages.indexOf(dest));
//   // console.log(sessionStats);
//   if (c1 || c2 || c3 || c4) {
//     console.log('all normal');
//     return methodCall.proceed();
//   } else if (sessionStats && sessionStats.isAdmin) {
//     console.log('back to the admin cage');
//     methodCall.args[0] = '/getAllInventoryItems';
//     methodCall.method = 'redirect';
//   } else if (sessionStats) {
//     console.log('back to the client cage');
//     methodCall.args[0] = '/getAllInventoryItems';
//     methodCall.method = 'redirect';
//   } else {
//     console.log('backgroundMagic');
//     return methodCall.proceed();
//   }
// });
