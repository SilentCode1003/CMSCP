var express = require("express");
var router = express.Router();

const { Select, Insert, edit, deleteUser,constructSQLQuery} = require("./repository/database");

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
router.get("/loadlist", (req, res) => {
  try {
    let sql = `SELECT
    a_id as accessid, 
    a_name as accessname
    FROM access`;

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
    const { fullname, username, password, selectaccess, status, createdBy, createdDate } = userData;
    let sql = `INSERT INTO users (fullname, username, password, accessType, status, createdBy, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let values = [fullname, username, password, selectaccess, status, createdBy, createdDate];

  
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
      const { userId, username, fullname, selectaccess, password } = req.body;

      // console.log("Received userId:", userId);
      // console.log("Received data:", { fullname, username, selectaccess, password });
  
      if (!userId) {
          return res.status(400).json({ error: "No user ID provided for update" });
      }

      const sql = `UPDATE users SET fullname=?, username=?, password=?, accessType=? WHERE ID=?`;
      const values = [fullname, username, password, selectaccess, userId];

      edit(sql, values, (error, result) => {
          if (error) {
              return res.status(500).json({ error: "Database error" });
          }
          if (!result || result.affectedRows === 0) {
              return res.status(404).json({ error: "User not found or not updated" });
          }

          console.log(`Updated Rows: ${result.affectedRows}`);

          res.json({ msg: "success", data: { userId, username, fullname, password, selectaccess } });
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
router.put('/editstatus/:userId/status', async (req, res) => {
  try {
      const userId = req.params.userId;
      const newStatus = req.body.NewStatus;

      if (!newStatus || !userId) {
          return res.status(400).json({ error: 'Invalid request parameters' });
      }

     
      let sql = `UPDATE users SET status = ? WHERE ID = ?`;
      let values = [newStatus, userId];

      
      edit(sql, values, (error, result) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Database error' });
          }
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'User not found or not updated' });
          }
          res.status(200).json({ message: 'User status updated successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
