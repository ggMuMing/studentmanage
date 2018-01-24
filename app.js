//引入模块
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//引入路由文件
const Manage = require("./router/manage");
const Page = require("./router/page");

//定义一个express运行变量
let app = express();

//利用body-parser模块解析post提交的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//引入静态文件
app.use(express.static(path.join(__dirname,"static")));

//设置ejs模板引擎
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//将客户端请求交给manage.js处理
app.post("/addClass",Manage.addClass);
app.post("/deleteClass",Manage.deleteClass);
app.post("/addStudent",Manage.addStudent);
app.post("/deleteStudent",Manage.deleteStudent);
app.post("/getStudent",Manage.getStudent);

//页面请求渲染页面
app.get("/",Page.showIndex);
app.get("/class",Page.showClass);

//开启服务器
app.listen(8000,function() {
  console.log("服务器开启成功");
});