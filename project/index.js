const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');


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

app.get('/example', function(req, res) {
  res.render('example', { text: "What's popping?"});
})

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
