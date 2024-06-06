var express = require('express');
var router = express.Router();
const { Select, Insert, edit, deleteUser} = require("./repository/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mediacontentlayout', { title: 'Express' });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = "SELECT * FROM mediacontent";

    Select(sql, (err, result) => {
      if (err) {
        res.json({
          msg: err,
        });
      }
      console.log("Data:", result);
      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});