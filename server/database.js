const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "opprofmudel",
  host: "localhost",
  password: "admin",
  database: "opetajaprofareng2"
});

  