var express = require('express');
var router = express.Router();

const { Select, Insert, edit, deleteUser} = require("./repository/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('subpanellayout', { title: 'Express' });
});

router.get("/load", (req, res) => {
  try {
    let sql = "SELECT * FROM subpanel";

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

router.post("/save", (req, res) => {
  try {
    let subpanelData = req.body;
    const { panelId,s_panelid, s_name, s_status, s_createdBy, s_createdDate } = subpanelData; 
    let sql = `INSERT INTO subpanel (s_panelid, s_name, s_status, s_createdBy, s_createdDate) VALUES (?, ?, ?, ?, ?)`;
    let values = [s_panelid, s_name, s_status, s_createdBy, s_createdDate,panelId];


    Insert(sql, values, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Error occurred while saving data" });
      }
      console.log(`Inserted Rows: ${result.affectedRows}`);
      res.json({ msg: "success", data: result });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/edit", async (req, res) => { 
  try {
    const {categoryId, c_name, c_status, c_createdBy, c_createdDate } = req.body; 
    
     console.log("Received Id:",categoryId); 
    console.log("Received data:", { categoryId,c_name, c_status, c_createdBy, c_createdDate });

  
    let sql =`UPDATE category SET c_name=?, c_status=?, c_createdBy=?, c_createdDate=? WHERE c_id=?`;

    let values = [c_name, c_status, c_createdBy, c_createdDate, categoryId]; 

    
    edit(sql, values, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }
      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found or not updated" });
      }
      
      console.log(`Updated Rows: ${result.affectedRows}`);

      res.json({ msg: "success", data: { categoryId, c_name, c_status, c_createdBy, c_createdDate,} }); 
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    const subpanelId = req.params.id;

    let sql = `DELETE FROM category WHERE s_id = ?`;

    let values = [subpanelId];

    deleteUser(sql, values, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Error occurred while deleting data" });
      }

      console.log(`Deleted Rows: ${result.affectedRows}`);

      res.json({ msg: "success" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});





module.exports = router;