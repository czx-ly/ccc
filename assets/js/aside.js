$(function() {
  //获取location.href中的最后一个、后面的内容，

  var routername = itcast.getRouterName(location.href);

  //获取想操作的dom元素
  var menu_posts = $("#menu-posts");
  //判断路由名称
  if (
    routername == "post-add" ||
    routername == "posts" ||
    routername == "categories"
  ) {
    menu_posts.addClass("in");
    menu_posts.attr("aria-expanded", true);
  }
  //获取想操作的dom元素
  var menu_settings = $("#menu-settings");
  //判断路由名称
  if (
    routername == "nav-menus" ||
    routername == "slides" ||
    routername == "settings"
  ) {
    menu_settings.addClass("in");
    menu_settings.attr("aria-expanded", true);
  }
  //添加actuve样式：排他发
  $("li").removeClass("active");
  $("#" + routername).addClass("active");
});
