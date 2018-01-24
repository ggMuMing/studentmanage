const mongoose = require("mongoose");

//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Team").then(function(db) {
  // if(db!=null) {
  //   console.log("数据库连接成功");
  // } else {
  //   console.log("数据库连接失败，请重新链接");
  // }
  console.log("数据库连接成功");
});

//获取schema构造器
let Schema = mongoose.Schema;

//创建一个Schema
let TeamSchema = new Schema({
  className:{type:String},
  students:{type:Array}
});

//注册Schema模型
let mainDB = mongoose.model("Team",TeamSchema);

//输出该模型，供外部调用
module.exports = mainDB;