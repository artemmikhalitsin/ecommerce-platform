const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const rootPath = require('app-root-dir').get();

const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));

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

app.get('/addproduct', function(req, res) {
  res.render('inventory/new-product');
});

// Use  access data from database
app.get('/testdb', function(req, res) {
  database('User').select( )
    .then((customer) => {
      customer = JSON.stringify(customer);
      res.render('hbs_test', {body: customer});
    })
    .catch((error) => {
        res.status(500).json({error});
        return res.send();
    });
});

/*
repos: right ones : w/  modules.export
import functions
const userRepo = require('/path/to/userrepo.js')
userRepo (use the appropriate functions )
*/

app.get('/getAllInventoryItems', function(req, res) {
  const desktopRepo = require(rootPath + '/DataSource/Repository/DesktopRepository.js');
  const laptopRepo = require(rootPath + '/DataSource/Repository/LaptopRepository.js');
  const monitorRepo = require(rootPath + '/DataSource/Repository/MonitorRepository.js');
  const tabletRepo = require(rootPath + '/DataSource/Repository/TabletRepository.js');
  const tvRepo = require(rootPath + '/DataSource/Repository/TVRepository.js');

  let laptopItems = laptopRepo.get('*');
  let desktopItems = desktopRepo.get('*');
  let monitorItems = monitorRepo.get('*');
  let tabletItems = tabletRepo.get('*');
  let tvItems = tvRepo.get('*');
  Promise.all([laptopItems, tvItems, monitorItems, tabletItems, desktopItems])
  .then((values) => {
    let allItems = {
      laptops: values[0],
      tvs: values[1],
      mons: values[2],
      tabs: values[3],
      desks: values[4],
    };
    let items = JSON.stringify(allItems);
    res.render('inventory2', {items: items});
  }).catch((error) => {
 console.log(error);
});
});

app.get('/users', function(req, res) {
  const userRepo = require(rootPath + '/DataSource/Repository/UserRepository.js');
  userRepo.get().then((users) => {
    console.log(users);
    res.render('users', {users: users});
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
});

// MOVE TO CONTROLLER WHEN IT'S THERE
app.post('/registrationRequest', function(req, res) {
    let userData = req.body;
    let password = userData['password'];
    let confirmPassword = userData['confirmPassword'];

    if (password != confirmPassword) {
      console.log('password confirmation failed. try again...');
      res.redirect('/registration');
    } else {
      delete userData['confirmPassword'];

      let email = userData['email'];

      const userRepo = require(rootPath + '/DataSource/Repository/UserRepository.js');
      userRepo.verifyEmail(email).then( (result) => {
        console.log(result);
        if (result.length == 0) {
          console.log('adding new user');
          if (userData['is_admin'] == 'on') {
            userData['is_admin'] = true;
          } else {
            userData['is_admin'] = false;
          }
          console.log(userData);
          userRepo.save(userData).then( (result) => {
            console.log('success: ' + result);
            res.redirect('/login');
          })
          .catch( (err) => {
            console.log('failed: ' + err);
            res.redirect('/registration');
          });
        } else {
          console.log('Email already exists');
          res.redirect('/registration');
        }
      })
      .catch( (err) => {
        console.log('something bad happened');
      });
    }


    // console.log(asd);
});

app.post('/postDesktop', function(req, res) {
  console.log('starting');
  let desktop = req.body;
  const desktopRepo = require(rootPath + '/DataSource/Repository/DesktopRepository.js');
  console.log('fetching data...');
  desktopRepo.save(desktop)
             .then((result) => {
              res.redirect('/addItem');
           })
            .catch(function(e) {
              console.log('error inserting to Database');
              res.redirect('/login');
            });
});

app.post('/loginRequest', function(req, res) {
  let data = req.body;
  console.log(data);
  const userRepo = require(rootPath + '/DataSource/Repository/UserRepository.js');
  userRepo.authenticate(data).then((result) => {
    console.log('type of '+ result + ' is ' + typeof(result));
    if (result.length <= 0) {
      console.log('Invalid username or password.');
      res.redirect('/login');
    } else if (result.length > 1) {
      console.log('Duplicate users detected');
      res.redirect('/login');
    } else if (result.length == 1) {
      console.log('displaying items');
      res.redirect('/getAllInventoryItems');
    }
  });
});


app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
