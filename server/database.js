const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "opprofmudeluser",
  host: "localhost",
  password: "0pProfMudel10!",
  database: "opprofmudeldb2"
});
