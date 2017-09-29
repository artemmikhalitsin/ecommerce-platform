const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const rootPath = require('app-root-dir').get();

const app = express();
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var cookieParser = require('cookie-parser');


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
  const desktopRepo = require(rootPath + '/DataSource/Repository/DesktopRepository.js');
  const laptopRepo = require(rootPath + '/DataSource/Repository/LaptopRepository.js');
  const monitorRepo = require(rootPath + '/DataSource/Repository/MonitorRepository.js');
  const tabletRepo = require(rootPath + '/DataSource/Repository/TabletRepository.js');
  const tvRepo = require(rootPath + '/DataSource/Repository/TVRepository.js');

  let laptopItems = laptopRepo.get('*')
  //let desktopItems = desktopRepo.get('*');
  let monitorItems = monitorRepo.get('*');
  let tabletItems = tabletRepo.get('*');
  let tvItems = tvRepo.get('*');
  Promise.all([laptopItems, tvItems, monitorItems, tabletItems]).then((values) => {
    let allItems = {
      laptops: values[0],
      tvs: values[1],
      mons: values[2],
      tabs: values[3]
    }
    let items = JSON.stringify(allItems)
    res.render('inventory2', {items: items})
  }).catch((error) => { console.log(error) })
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
