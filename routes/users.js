var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("userlayout", { title: "Users" }); //this will render
});

module.exports = router;
