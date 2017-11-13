// require('babel-core').transform('code', {});
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
  isAdmin: false,
  resave: false,
  saveUninitialized: true,
  user: null,
}));

// let sess;
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');


app.use(function(req,res){
if (req.session.exists == true) {
  if (req.session.isAdmin == true){
      console.log('logged as admin');

  } else{
      console.log('logged as customer');

  }

} else {
  console.log('not logged in')

}

});

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

app.get('/catalog', function(req, res) {
  res.render('catalog');
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
/* app.get('/clientInventory', function(req, res) {
  if (req.session.exists) {
    controller.getAllInventory(req, res);
    console.log('Successs');
  } else {
    console.log('login error');
    res.redirect('/login');
  }
});*/

// making the registration request
app.post('/registrationRequest', function(req, res) {
  controller.registrationRequest(req, res);
});

// making the login request
app.post('/loginRequest', function(req, res) {
   controller.loginRequest(req, res);
});

app.post('/inventoryAction', function(req, res) {
     controller.inventoryAction(req, res);
});

app.post('/addToCart', function(req, res) {
    controller.addToShoppingCart(req, res);
});

app.post('/removeFromCart', function(req, res) {
    controller.removeFromShoppingCart(req, res);
});

app.post('/purchaseItems', function(req, res) {
  controller.completePurchaseTransaction(req, res);
});

app.get('/viewShoppingCart', function(req, res) {
  controller.viewShoppingCart(req, res);
});

app.post('/cancelTransaction', function(req, res) {
  controller.cancelPurchaseTransaction(req, res);
});

app.get('/viewPurchaseCollection', function(req, res) {
  controller.viewPurchaseCollection(req, res);
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
