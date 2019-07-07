//所有与分类相关的操作都在这个文件中完成

//1:引入mysql
var mysql = require("mysql");
//创建连接
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "baixiu",
  dateStrings: true
});

//获取所有分类数据
exports.getAllCateList = callback => {
  var sql = "select * from categories";
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};
