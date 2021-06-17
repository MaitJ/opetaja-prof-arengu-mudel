const mysql = require('mysql');

exports.db = mysql.createConnection({
  user: "user",
  host: "localhost",
  password: "pw",
  database: "db"
});

  