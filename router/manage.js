const TeamDB = require("../module/mainDB"); //引入TeamDB Schema用于数据库操作

module.exports = {
  addClass: function(req, res) {
    //创建新的表
    let newTeam = new TeamDB({
      className: req.body.className,
      students: []
    });

    newTeam.save(function(err) {
      res.writeHeader(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (err != null) {
        //数据库插入失败
        res.end(JSON.stringify({ isSuccess: false }));
      } else {
        //数据库插入成功
        res.end(JSON.stringify({ isSuccess: true }));
      }
    });
  },
  deleteClass: function(req, res) {
    //删除固定班级
    TeamDB.remove({ className: req.body.className }, function(err) {
      res.writeHeader(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (err != null) {
        res.end(JSON.stringify({ isSuccess: false }));
      } else {
        res.end(JSON.stringify({ isSuccess: true }));
      }
    });
  },
  addStudent: function(req, res) {
    TeamDB.find({ className: req.body.className }, { _id: 0, __v: 0 }, function(
      err,
      data
    ) {
      res.writeHeader(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (err != null) {
        res.end(JSON.stringify({ isSuccess: false }));
      } else {
        //更新数据库
        var students = data[0].students;
        students.push(req.body.studentName);

        TeamDB.update(
          {
            className: req.body.className
          },
          {
            $set: { students: students }
          },
          {
            multi: false
          },
          function(err) {
            if (err != null) {
              res.end(JSON.stringify({ isSuccess: false }));
            } else {
              res.end(JSON.stringify({ isSuccess: true }));
            }
          }
        );
      }
    });
  },
  getStudent: function(req, res) {
    TeamDB.find({ className: req.body.className }, { _id: 0, __v: 0 }, function(
      err,
      data
    ) {
      res.writeHeader(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (err != null) {
        res.end(JSON.stringify({ isSuccess: false }));
      } else {
        res.end(
          JSON.stringify({ isSuccess: true, students: data[0].students })
        );
      }
    });
  },
  deleteStudent: function(req, res) {
    console.log(req.body.studentName);
    TeamDB.find({ className: req.body.className }, { _id: 0, __v: 0 }, function(
      err,
      data
    ) {
      res.writeHeader(200, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (err != null) {
        res.end(JSON.stringify({ isSuccess: false }));
      } else {
        var students = data[0].students;
        // console.log(students);
        // console.log(req.body.studentName);
        // console.log(students.indexOf(req.body.studentName));
        students.splice(students.indexOf(req.body.studentName), 1);

        TeamDB.update(
          {
            className: req.body.className
          },
          {
            $set: { students: students }
          },
          {
            multi: false
          },
          function(err) {
            if (err != null) {
              res.end(JSON.stringify({ isSuccess: false }));
            } else {
              res.end(JSON.stringify({ isSuccess: true }));
            }
          }
        );
      }
    });
  }
};
