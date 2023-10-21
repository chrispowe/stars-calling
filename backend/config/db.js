const mysql = require('mysql2');
require('dotenv').config();


// THIS FILE WILL CONNECT TO THE DATABASE THROUGH A FUNCTION

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'starscalling'
})

dbConnection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected !');
  });

module.exports = dbConnection;