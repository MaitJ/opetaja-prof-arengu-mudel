const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "opprofmudeluser",
  host: "localhost",
  password: "admin",
  database: "opetajaprofareng"
});