require('dotenv').config()
const mysql = require('mysql')
const{DB_NAME,DB_USER,DB_PASS,DB_HOST} = process.env

// db.js

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: 3308
});



module.exports = conn;
