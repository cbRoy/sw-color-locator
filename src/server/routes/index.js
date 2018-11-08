var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */
router.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname + "../../../../dist/index.html"));
  //res.render("index", { title: "Search Color Locations" });
});

module.exports = router;
