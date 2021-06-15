const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "adminadmin",
  database: "opetajaprofareng"
});