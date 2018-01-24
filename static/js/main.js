// 定义变量、DOM操作
// 获取按钮DOM
var $addClass = $("#addclass"); //添加班级
var $addStudent = $("#addstudent"); //添加学生
var $deleteClass = $("#deleteclass"); //删除班级
var $deleteStudent = $(".deleteStudent"); //删除学生
// 其他表单的DOM操作
var $className = $("#className"); //获取添加班级输入框
var $classSelect = $("#classselect"); //获取选择班级选择框
var $studentName = $("#studentName"); //获取添加学生输入框

// 显示学生列表
var $studentList = $("#studentList");


//页面操作、数据传递
//添加班级
function addClass() { 
  //获取输入框中用于添加班级的值
  var classValue = $className.val();
  if (classValue == "") {
    alert("添加班级的输入框为空");
    return;
  }
  //向服务器发出请求，向数据库中添加班级
  $.ajax(
    {
      //请求的路径、请求方式、提交的值
      url: "/addClass",
      type: "POST",
      data: {
        className: classValue
      },
      //服务响应成功
      success: function(data, textStatus) {
        //通过标志符进一步判断响应是否成功
        if (!data.isSuccess) {
          alert("插入失败");
        } else {
          //成功，则将输入框清零，在选择班级的下拉菜单中添加该班级选项
          $className.val("");
          $classSelect.append("<option>" + classValue + "</option>");
        }
      }
    },
    "json"
  );
}
//删除班级
function deleteClass() {
  //获取选择框中选择的班级
  var classSelValue = $("#classselect option:selected").val();

  //如果下拉框已经没有班级则提示班级已经删除完毕
  if ($classSelect.children().length == 0) {
    alert("班级删除完毕");
  }
  if (classSelValue == "") {
    alert("班级名称不能为空");
    return;
  }
  //通过post方法将请求提交给服务器
  $.ajax(
    {
      url: "/deleteClass",
      type: "POST",
      data: { className: classSelValue },
      success: function(data, textStatus) {
        if (!data.isSuccess) {
          alert("删除失败");
        } else {
          //响应成功，请求完成，移除班级
          $("#classselect option:selected").remove();
          $studentList.remove();
        }
      }
    },
    "json"
  );
}
//添加学生
function addStudent() {
  var classSelValue = $("#classselect option:selected").val();
  var studentValue = $studentName.val();
  if (studentValue == "") {
    alert("请输入学生姓名");
    return;
  }
  $.ajax(
    {
      url: "/addStudent",
      type: "POST",
      data: { className: classSelValue, studentName: studentValue },
      success: function(data, textStatus) {
        if (!data.isSuccess) {
          alert("插入失败");
        } else {
          $studentName.val("");
          
          //在学生列表中添加学生
          $studentList.append(
            "<tr><td class='number'>" +
              ($studentList.children().length + 1) +
              "</td><td>" +
              studentValue +
              "</td><td><button class='deleteStudent'>删除</button></td></tr>"
          );

          //为新建的删除按钮添加监听事件
          $(".deleteStudent:last").bind("click", deleteStudent);
        }
      }
    },
    "json"
  );
}
//删除学生
function deleteStudent() {
  var $that = $(this);

  //通过点击的按钮找到学生的序号，用于下面的序号递减
  var studentNum = $that
    .parent()
    .prev()
    .prev()
    .text()
    .trim();

  //获取要删除的学生的姓名
  var studentName = $that
    .parent()
    .prev()
    .text()
    .trim();

  var classSelValue = $("#classselect option:selected").val();
  $.ajax(
    {
      url: "/deleteStudent",
      type: "POST",
      data: {
        className: classSelValue,
        studentName: studentName
      },
      success: function(data) {
        if (!data.isSuccess) {
          alert("删除学生失败");
        } else {
          //删除学生
          $that
            .parent()
            .parent()
            .remove();

          //遍历下面的学生序号，递减
          for (var i = 0; i < $(".number").length; i++) {
            if (i >= studentNum - 1) {
              $(".number")
                .eq(i)
                .text(
                  $(".number")
                    .eq(i)
                    .text() - 1
                );
            }
          }
        }
      }
    },
    "json"
  );
}
//改变班级选择，显示学生名单
function classChange() {
  var selectClass = $("#classselect option:selected").val();

  //请求服务器添加数据
  $.ajax({
    url: "/getStudent",
    type: "POST",
    data: {
      className: selectClass
    },
    success: function(data) {
      if (!data.isSuccess) {
        alert("获取学生列表失败");
      } else {
        $deleteStudent.unbind("click");

        //先删除之前班级的学生列表
        $studentList.children().remove();

        for (var i = 0; i < data.students.length; i++) {
          $studentList.append(
            "<tr><td class='number'>" +
              ($studentList.children().length + 1) +
              "</td><td>" +
              data.students[i] +
              "</td><td><button class='deleteStudent'>删除</td>"
          );
        }

        //添加监听事件
        $(".deleteStudent").bind("click", deleteStudent);
      }
    }
  });
}
/********************函数方法代码*********************/

/********************给按钮添加监听事件*********************/
$addClass.bind("click", addClass);
$deleteClass.bind("click", deleteClass);
$addStudent.bind("click", addStudent);
$deleteStudent.bind("click", deleteStudent);
$classSelect.bind("change", classChange);
/********************给按钮添加监听事件*********************/
