var express = require('express');
var router = express.Router();


const { Select, Insert, edit, deleteUser} = require("./repository/database");
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('customerlayout', { title: 'Express' });
});

router.get("/load", (req, res) => {
  try {
    let sql = "SELECT * FROM customer";

    Select(sql, (err, result) => {
      if (err) {
        res.json({
          msg: err,
        });
      }

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
module.exports = router;