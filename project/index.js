const express = require('express');
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

var path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //allows use of static pages

app.get('/', function(req, res) {
  res.sendFile('public/testpage.html', {root: __dirname});
});

app.get('/login', function(req, res) {
  res.sendFile('public/login.html', {root: __dirname});
});

app.get('/registration', function(req, res) {
  res.sendFile('public/registration.html', {root: __dirname});
});

app.get('/inventory', function(req, res) {
  res.sendFile('public/inventory.html', {root: __dirname});
});

app.get('/addItem', function(req, res) {
  res.sendFile('public/addItem.html', {root: __dirname});
});

app.get('/database', function(req, res) {
  res.sendFile('public/database.html', {root: __dirname});
});

app.get('/admin', function(req, res) {
  res.sendFile('public/admin.html', {root: __dirname});
});


//Use  access data from database
app.get('/test', function(req, res) {
  database('User').select(  )
    .then((customer) => {
        res.status(200).json(customer);
        res.data(customer);
    })
    .catch((error) => {
        res.status(500).json({error});
        return res.send();
    })
});

//MOVE TO CONTROLLER WHEN IT'S THERE
app.post('/registrationRequest', function(req, res){
    let userData = req.body;
    //temporary: call repo to post this information
    database('User').insert(userData)
      .then(user => {
        res.status(200).json(userData)
        return res.send(userData);
      })
      .catch(error => {
        res.status(500).json({error});
        return res.send(userData);
      });
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
