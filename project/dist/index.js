'use strict';

// const stringy = require('stringy');
var authPages = ['loginRequest', 'inventoryAction', 'logout'];

var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var session = require('express-session');
var rootPath = require('app-root-dir').get();
var crypto = require('crypto');
var app = express();
var meld = require('meld');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false
}));

var Controller = require(rootPath + '/Controllers/controller');
var UserRepository = require(rootPath + '/DataSource/Repository/UserRepository.js');
var controller = new Controller();
var userRepo = new UserRepository();

// allows use of static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'top',
  hash: '',
  email: '',
  exists: false,
  isAdmin: false,
  resave: false,
  saveUninitialized: true
}));

// let sess;
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

// loading the home page
app.get('/', function (req, res) {
  res.render('home');
});

// getting the login page
app.get('/login', function (req, res) {
  if (req.session.exists) {
    console.log('already logged in, redirecting to inventory');
    res.redirect('/getAllInventoryItems');
  } else {
    res.render('login');
  }
});

// getting the registration page
app.get('/registration', function (req, res) {
  if (req.session.exists) {
    console.log('already logged in, redirecting to inventory');
    res.redirect('/getAllInventoryItems');
  } else {
    res.render('registration');
  }
});

app.get('/addProduct', function (req, res) {
  if (req.session.exists) {
    res.render('inventory/new-product');
  } else {
    res.redirect('/login');
  }
});

// this should be implemented in the controller
app.get('/logout', function (req, res) {
  controller.logout(req, res);
});

// getting the inventory from the database
app.get('/getAllInventoryItems', function (req, res) {
  if (req.session.exists) {
    controller.getAllInventory(req, res);
  } else {
    console.log('login error');
    controller.getAllInventory(req, res);
  }
});
app.get('/catalog', function (req, res) {
  if (req.session.exists) {
    controller.getCatalog(req, res);
  } else {
    console.log('login error');
    controller.getAllInventory(req, res);
  }
});
app.post('/manageProductCatalog', function (req, res) {
  if (req.session.exists) {
    controller.manageProductCatalog(req, res);
  } else {
    console.log('login error');
    controller.getAllInventory(req, res);
  }
});
// getting the client inventory from the database
app.get('/clientInventory', function (req, res) {
  controller.getAllInventory(req, res);
  console.log('Successs');
});
app.get('/getProductDescription', function (req, res) {
  controller.getProductDescription(req, res);
});
// making the registration request
app.post('/registrationRequest', function (req, res) {
  controller.registrationRequest(req, res);
});

// making the login request
app.post('/inventoryAction', function (req, res) {
  controller.inventoryAction(req, res);
});

// making the login request
app.post('/loginRequest', function (req, res) {
  controller.loginRequest(req, res);
});

app.post('/addToCart', function (req, res) {
  controller.addToShoppingCart(req, res);
});

app.post('/removeFromCart', function (req, res) {
  controller.removeFromShoppingCart(req, res);
});

app.post('/purchaseItems', function (req, res) {
  controller.completePurchaseTransaction(req, res);
});

app.get('/viewShoppingCart', function (req, res) {
  controller.viewShoppingCart(req, res);
});

app.post('/cancelTransaction', function (req, res) {
  controller.cancelPurchaseTransaction(req, res);
});

app.get('/viewPurchaseCollection', function (req, res) {
  controller.viewPurchaseCollection(req, res);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

meld.around(controller, authPages, function (joinpoint) {
  console.log('Caught by aspect, validating the user...');
  var req = joinpoint.args[0];
  var res = joinpoint.args[1];
  var data = {};
  if (!req.session.exists) {
    data = req.body;
    var hash = crypto.createHash('sha256');
    var salted = data.email + data.password + 'salt';
    salted = hash.update(salted).digest('hex');
    data.password = salted;
  } else {
    data = {
      email: req.session.email,
      password: req.session.hash
    };
  }
  return userRepo.authenticate(data).then(function (result) {
    if (result.length <= 0) {
      console.log('Session rejected by aspect. ' + 'Reason: Invalid user/pass.');
      req.session.destroy();
      res.redirect('/');
    } else if (result.length > 1) {
      console.log('Session rejected by aspect. ' + 'Reason: Duplicate database entries detected.');
      req.session.destroy();
      res.redirect('/');
    } else if (result.length == 1) {
      if (!req.session.exists) {
        req.session.exists = true;
        req.session.hash = data.password;
        req.session.email = data.email;
      }
      if (result[0].is_admin == 1) {
        // REVIEW: this should probably be removed - Artem
        console.log('User is admin.');
        req.session.isAdmin = true;
        req.session.user = data.email;
        return joinpoint.proceed(req, res);
      } else {
        // REVIEW: this should probably be removed - Artem
        console.log('User is not admin.');
        req.session.isAdmin = false;
        req.session.user = data.email;
        return joinpoint.proceed(req, res);
      }
    }
  }).catch(function (errors) {
    console.log('Invalid Session.');
    req.session.destroy();
    res.redirect('/');
  });
});