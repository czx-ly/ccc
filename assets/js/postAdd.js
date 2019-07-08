$(function() {
  //加载分类数据
  $.ajax({
    url: "/getAllCateList",
    dataType: "json",
    success: function(res) {
      //生成分类数据的动态结构
      var html = "";
      for (var i = 0; i < res.data.length; i++) {
        html += ` <option value=" ${res.data[i].id}">${
          res.data[i].name
        }</option>`;
      }
      $("#category").html(html);
    }
  });
  //初始化富文本框，创建一个富文本框覆盖指定id号的textares
  CKEDITOR.replace("content");

  //保存文章数据--实现文章的新增
  $(".btnSave").on("click", function(e) {
    e.preventDefault();
    //同步数据，将富文本框中的数据与textarea 中的数据进行同步，两者同步之后数据一样
    CAEDITOR.instances, content.updateElement();
    //serialize:获取当前表单中所有拥有name属性的value值
    console.log($(".row").serialize());
    //直接富文本框的数据，
    //instances:可以获取当前CKEDITOR的所的实例，通过replace方法就可以创建实例，
    //getdata 是可以获取到数据，但是对于我们而言，需要额外的进行参数的拼接，不方便。
    $.ajax({
      type: "post",
      url: "/addPost",
      data: $(".row").serialize(),
      dataType: "json",
      success: function(res) {
        console.log(res);
      }
    });
  });

  //实现文件的上传
  $("#deature").on("change", function() {
    //获取当前被选择文件对象
    //files:可以获取当前所有被选择文件对象，他是一个数组，里面的每个值都是当前选择的一个一个文件对象，
    var myfile = document.querySelector("#featuer").files[0];
    //创建formdata
    var formdata = new FormData();
    //追加参数
    formdata.append("img", myfile);
    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/uploadFile",
      data: formdata,
      processData: false, //让ajax不要进行数据的处理，因为formdata会进行处理，
      contentType: false, //让ajax不要对数据进行编码，因为formdata会进行编码处理，
      dataType: "json",
      success: function(res) {
        if (res.code == 200) {
          $("[name=featuer]").val(res.img);
          $(".thumbnail")
            .attr("src", "/assets/uploads/" + res.img)
            .show();
        } else {
        }
      }
    });
  });
  //获取当前可能存在的pid值
  //访问一个不存在的对象----对象没有定义
  //访问一个对象不存在的属性，仅仅是返回unddfined
  var id = itcast.getParameter(location.search).id;

  //修改提示文本
  id
    ? $(".page-title > h1").text("编辑文章")
    : $(".page-title > h1").text("写文章");
  //判断是否有id ，如果有就编辑，如果没有就是新增
  if (id) {
    //要根据id 号获取当前id 所对应的文章数据
    $.ajax({
      url: "/getPostById",
      type: "get",
      data: { id },
      dataType: "json",
      success: function(res) {
        console.log(res);
        if (res.code == 200) {
          //进行表单数据的默认填充
          $("#title").val(res.data.title);
          $("#content").val(res.data.content);
          $("#slug").val(res.data.slug);
          $(".thumbnail")
            .attr("src", "/uploads/" + res.data.feature)
            .show();
          //对于图片，不公开显示，而且还有储存影藏域，因为我们不能强迫用户进去修改每个值，对于图片，如果用户没有修改图片，应该保留原始图片，我们后期获取数据会从影藏域中获取，所以我们还将图片名称储存到影藏域中
          $("[name=feature]").val(res.data.feature);
          $("#category").val(res.data.category_id);
          //当前日期表单元素需要格式化，
          $("#created").val(res.data.created);
          $("#status").val(res.data.status);
          //编辑一定需要条件，我们将id储存到影藏域
          $('[name="id"]').val(id);
        }
      }
    });
  }
  //保存文章数据，实现文章的新增
  $(".btnSave").on("click", function(e) {
    e.preventDefault();
    //同步数据：将富文本框中的数据与textarea 中的数据进行同步，两者同步之后数据就会一样
    CKEDITOR.instances.content.updateElement();
    //如果有id就要编辑，不然就是保存
    if (id) {
      Opt("/editPost");
    } else {
      Opt("/addPost");
    }
  });
  //封装一个函数，实现新增或者编辑
  function Opt(url) {
    //serialize:获取当前表单中所有拥有name属性的value值，
    $.ajax({
      type: "post",
      url: url,
      data: $(".row").serialize(),
      dataType: "json",
      success: function(res) {
        console.log(res);
        if (res.code == 200) {
          alert(110);
          $(".alert-danger > strong").text("新增成功");
          $(".alert-danger > span").text(res.msg);
          $(".alert-danger").show();
          setTimeout(() => {
            location.href = "/admin/posts";
          }, 3000);
        }
      }
    });
  }
});
