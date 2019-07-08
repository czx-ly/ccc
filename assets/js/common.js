var itcast = {
  //获取当前href中的路由名称
  getRouterName: href => {
    //?就是是否有参数的标识
    var index = href.indexOf("?");
    //定义一个变量来储存路由名称
    var routername = "";
    //判断是否有参数
    if (index == -1) {
      //没有参数
      routername = href.substring(href.lastIndexOf("/") + 1);
    } else {
      routername = href.substring(href.lastIndexOf("/") + 1, href.indexOf("?"));
    }
    return routername;
  },
  //通过url中的参数
  getParameter: str => {
    var obj = {};
    //去除
    str = str.substring(1);
    //对字符串进行分割
    var temp = str.split("&");
    //遍历再次分割
    for (var i = 0; i < temp.length; i++) {
      var arr = temp[i].split("=");
      //生成键值对
      obj[arr[0]] = arr[1];
    }
    return obj;
  }
};
