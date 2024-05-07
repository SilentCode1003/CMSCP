var express = require("express");
var router = express.Router();

const { Select, Insert, edit, deleteUser} = require("./repository/database");

router.get("/", function (req, res) {
  res.render("userlayout", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = "SELECT * FROM users";

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
    let userData = req.body;
    const { fullname, username, password, accesstype, status, createdBy, createdDate } = userData;
    let sql = `INSERT INTO users (fullname, username, password, accesstype, status, createdBy, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let values = [fullname, username, password, accesstype, status, createdBy, createdDate];

  
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
    const { userId, username, fullname, accesstype, password } = req.body; 
    
    console.log("Received userId:", userId); 
    console.log("Received data:", { fullname, username, accesstype, password });

    if (!userId) {
        return res.status(400).json({ error: "No user ID provided for update" });
    }

    const sql = `UPDATE users SET fullname=?, username=?, password=?, accesstype=? WHERE ID=?`;
    const values = [fullname, username, password, accesstype, userId]; 

    
    edit(sql, values, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }
      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found or not updated" });
      }
      
      console.log(`Updated Rows: ${result.affectedRows}`);

      res.json({ msg: "success", data: { userId, username, fullname, password, accesstype } }); 
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
   
    const userId = req.params.id;

    
    let sql = `DELETE FROM users WHERE ID = ?`;

    
    let values = [userId];

    
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
