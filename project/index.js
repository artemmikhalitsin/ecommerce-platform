const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');


const app = express();
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var cookieParser = require('cookie-parser');

const rootPath = require('app-root-dir').get();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public'))); //allows use of static pages

app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('testpage');
});


app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.get('/inventory', function(req, res) {
  res.render('inventory');
});

app.get('/addItem', function(req, res) {
  res.sendFile('public/addItem.html', {root: __dirname});
});

app.get('/database', function(req, res) {
  res.render('database');
});

app.get('/admin', function(req, res) {
  res.render('admin');
});


//Use  access data from database
app.get('/testdb', function(req, res) {
  database('User').select(  )
    .then((customer) => {
      customer = JSON.stringify(customer);
      res.render('hbs_test', {body: customer});
    })
    .catch((error) => {
        res.status(500).json({error});
        return res.send();
    })
});

/*
repos: right ones : w/  modules.export
import functions
const userRepo = require('/path/to/userrepo.js')
userRepo (use the appropriate functions )
*/

app.get('/getAllInventoryItems', function(req, res){
  const desktopRepo = require(rootPath + '/DataSource/DesktopRepository.js');
  const laptopRepo = require(rootPath + '/DataSources/LaptopRepository.js');
  const monitorRepo = require(rootPath + '/DataSources/MonitorRepository.js');
  const tabletRepo = require(rootPath + '/DataSources/TabletRepository.js');
  const tvRepo = require(rootPath + '/DataSources/TVRepository.js');

  let desktopItems = desktopRepo.get('*');
  let laptopItems = laptopRepo.get('*')
  let monitorItems = monitorRepo.get('*');
  let tabletItems = tabletRepo.get('*');
  let tvItems = tvRepo.get('*');
  let allItems = {
    desktops: desktopItems,
    laptops: laptopItems,
    monitors: monitorItems,
    tablets: tabletItems,
    tvs: tvItems
  }
  allItems = JSON.stringify(allItems);
  res.render('inventory', {items: allItems})
})

//MOVE TO CONTROLLER WHEN IT'S THERE
app.post('/registrationRequest', function(req, res){

    let userData = req.body;
    delete userData['confirmPassword'];
    console.log(userData);

    const userRepo = require(rootPath + '/DataSource/Repository/UserRepository.js');
    userRepo.save(userData);
});

app.post('/postDesktop', function(req,res){
  console.log("starting");
  let desktop = req.body;
 // var adminController = new AdministratorController();
  //adminController.save(desktop);
  console.log(desktop);
});


app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
