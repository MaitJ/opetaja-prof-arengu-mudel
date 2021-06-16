const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "opetajaprofareng2"
});