const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.sendFile('public/testpage.html' , { root : __dirname});
})

app.get('/login', function (req, res) {
  res.sendFile('public/login.html' , { root : __dirname});
})

app.get('/database', function (req, res) {
  res.sendFile('public/database.html' , { root : __dirname});
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
