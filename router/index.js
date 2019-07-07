//引入users表的控制器模块
const pagesController = require("../controllers/pageesController.js");
const postsController = require("../controllers/postsController.js");
const cateController = require("../controllers/cateController.js");
const uploadController = require("../controllers/uploadController");
const usersController = require("../controllers/usersController");
//封装路由模块
const express = require("express");

//一个中间件
const router = express.Router();

//前台页面
router
  .get("/", pagesController.getIndexPage)
  .get("/list", pagesController.getListPage)
  .get("/detail", pagesController.getDetailPage)

  //后台管理页面，后面的页面前面都加admin前缀

  .get("/admin", pagesController.getAdminPage)
  .get("/admin/categories", pagesController.getCategoriesPage)
  .get("/admin/comments", pagesController.getCommentsPage)
  .get("/admin/login", pagesController.getLoginPage)
  .get("/admin/nav-menus", pagesController.getNavMenusPage)
  .get("/admin/password-reset", pagesController.getPasswordResetPage)
  .get("/admin/post-add", pagesController.getPostAddPage)
  .get("/admin/posts", pagesController.getPostsPage)
  .get("/admin/profile", pagesController.getProfilePage)
  .get("/admin/slides", pagesController.getSlidesPage)
  .get("/admin/settings", pagesController.getSettingsPage)
  .get("/admin/users", pagesController.getUsersPage)

  //获取所有文章数据
  .get("/getPostList", postsController.getPostList)
  .get("/delPostById", postsController.delPostById)
  .post("/addPost", postsController.addPost)

  //获取所有分类数据
  .get("/getAllCateList", cateController.getAllCateList)

  //文件上传
  .post("/uploadFile", uploadController.uploadFile)

  //用户登录
  .post("/login", usersController.login);

// 暴露路由模块
module.exports = router;
