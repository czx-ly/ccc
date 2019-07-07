//引入mysql
var mysql = require("mysql");
//创建连接
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "baixiu",
  dateStrings: true
});

//获取所有文章数据
exports.getPostList = (params, callback) => {
  var sql = `select posts.id pid,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id uid,users.nickname,categories.name
  from posts
  inner join users on posts.user_id = users.id
  inner join categories on posts.category_id = categories.id
  where 1=1 `;
  //这里可以根据判断结构凭借筛选条件
  if (params.cate) {
    //拼接分类条件
    sql += ` and posts.category_id = ${params.cate}`;
  }
  if (params.statu) {
    //拼接状态条件
    sql += ` and posts.status = '${params.statu}'`;
  }
  sql += ` order by posts.id desc limit ${(params.pagenum - 1) *
    params.pagesize},${params.pagesize}`;

  connection.query(sql, (err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log(results);
      //条件语句，可以获取posts 表中的总记录数
      sql = "select count(*) cnt from posts";
      connection.query(sql, (err1, data1) => {
        if (err1) {
          callback(err1);
        } else {
          //我们需要返回查询出来的数据，又需要返回查询出来的总记录数
          callback(null, { result: results, total: data1[0].cnt });
        }
      });
    }
  });
};

//根据文章id删除文章数据
exports.delPostById = (id, callback) => {
  var sql = "delete from posts where id = " + id;
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};
