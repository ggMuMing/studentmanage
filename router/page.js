const TeamDB = require("../module/mainDB");

module.exports = {
  showIndex: function(req, res) {
    TeamDB.find({}, { "_id": 0, "__v": 0 }, function(err, data) {
      if (err != null) {
        res.render("error.ejs");
      } else {
        res.render("index.ejs", { data: data });
      }
    });
  },
  showClass: function(req, res) {
    TeamDB.find({}, { "_id": 0, "__v": 0 }, function(err, data) {
      if (err != null) {
        res.render("error.ejs");
      } else {
        res.render("class.ejs", { data: data });
      }
    });
  }
};
