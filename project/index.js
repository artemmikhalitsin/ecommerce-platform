const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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


//Random test, accesses data from database
app.get('/test', function(req, res) {
  database('customers').select()
    .then((customer) => {
        res.status(200).json(customer);
        res.data(customer);
    })
    .catch((error) => {
        res.status(500).json({error});
        return res.send();
    })
});

app.get('/makeAdminAccount', function(req, res){
  database('admin').where('user', req.registrationData.email).select()
    .then((adminAcct) => {
        if (adminAcct.length){
            response.status.json(adminAcct);
            res.status(500); //need to make new account
        } else { //if it doesn't exist. make account
            //insert into database here
            res.send();
        }
    })
    .catch((error) => {
        res.status(500).json({error});
        return res.send();
    })
})


app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
