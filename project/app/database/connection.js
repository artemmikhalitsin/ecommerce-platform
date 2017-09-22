const mysql = require('mysql');
const mysqlOptions = {
     host: 'localhost',
     user: 'me',
     password: 'secret',
     database: 'my_db'
}

var connection = mysql.createConnection
