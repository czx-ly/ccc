//引入express
const express = require("express");
const session = require("express-session");
//引入路由模块
const router = require("./router/index.js");
//引入ejs
const ejs = require("ejs");
const querystring = require("querystring");
//引入body-parser
var bodyParser = require("body-parser");
//创建应用
const app = express();
//添加指定端口监听
app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
//设置模板引擎为ejs
app.set("view engine", "ejs");
//指定模板文件的目录，后面使用ejs文件的时候就可以直接参照这个目录进行查询
app.set("views", "views");
//添加body-parser的配置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//让app应用使用session的方式来进行状态保持
app.use(
  session({
    //对session加密，加盐，  可以设置一个只有你自己知道的字符串  md5加密

    secret: "都可以",
    //重新保存，强制会话保存即使是未修改的，默认的也要写
    resave: false,
    //强制“未初始化”的会话保存到储存
    saveUninitialized: false
  })
);
//添加静态资源的托管
app.use("/assets", express.static("assets"));

//下面这个中间件，在每次请求时都会经过

app.use(function(req, res, next) {
  if (
    (req.session.isLogin && req.session.isLogin == "true") ||
    req.url == "/admin/login" ||
    req.url.indexOf("/admin") == -1
  ) {
    next();
  } else {
    res.redirect("/admin/login");
  }
});

//添加路由
app.use(router);
