/*
const authPages = ['home', 'login', 'registration',
                    'logout',
                    'clientInventory',
                    'getAllInventoryItems', 'addItem'];
                    */
/*
const fs = require('fs');
const logger = fs.createWriteStream('log.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
});
*/

// const stringy = require('stringy');
const authPages = ['loginRequest'];

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
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');
let controller = new Controller();
let userRepo = new UserRepository();

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
 res.render('home');
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
})

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
    controller.getAllInventory(req, res);
  }
});

// getting the client inventory from the database
app.get('/clientInventory', function(req, res) {

    controller.getAllInventory(req, res);
    console.log('Successs');

});

// making the registration request
app.post('/registrationRequest', function(req, res) {
  controller.registrationRequest(req, res);
});

// making the login request
app.post('/inventoryAction', function(req, res) {
     controller.inventoryAction(req, res);
});

// making the login request
app.post('/loginRequest', function(req, res) {
   controller.loginRequest(req, res);
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

meld.before(controller, /[a-z]*.nventory[a-zA-z]*/, function(req, res) {
  console.log('capturing inventory access, testing access');
  console.log(req.body);
});

// meld.around(app, 'render', function(page) {
//   console.log('caught res! :' + page.args);
//   return page.proceed();
// });ghn

meld.around(controller, authPages, (joinpoint) => {
  console.log('Caught by aspect, validating the user...');
  let req = joinpoint.args[0];
  let res = joinpoint.args[1];
  let data = req.body;
  return userRepo.authenticate(data).then((result) => {
    if (result.length <= 0) {
      console.log('Ses sion rejected by aspect. Reason: No such accuont.');
      req.session.destroy();
      res.redirect('/');
    } else if (result.length > 1) {
      console.log('Session rejected by aspect. Reason: Duplicate users detected');
      req.session.destroy();
      res.redirect('/');
    } else if (result.length == 1) {
      req.session.exists=true;
      if (result[0].is_admin == 1) {
        // REVIEW: this should probably be removed - Artem
        console.log('User is admin.');
        req.session.isAdmin=true;
        req.session.user = data.email;
        return joinpoint.proceed(req, res);
      } else {
        // REVIEW: this should probably be removed - Artem
        console.log('User is not admin.');
        req.session.isAdmin=false;
        req.session.user=data.email;
        return joinpoint.proceed(req, res);
      }
    }
  });
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
