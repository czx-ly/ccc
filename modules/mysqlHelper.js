//引入MySQL
var mysql = require("mysql");
//创建连接
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "baixiu",
  dateStrings: true
});

module.exports = connection;
