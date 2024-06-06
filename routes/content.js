var express = require("express");
var router = express.Router();

const { Select, Insert, edit, deleteUser} = require("./repository/database");

router.get("/", function (req, res) {
  res.render("contentlayout", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = "SELECT * FROM content";

    Select(sql, (err, result) => {
      if (err) {
        res.json({
          msg: err,
        });
      }

      console.log('Data', result);

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
    let contentData = req.body;
   
    const { categoryid, subcategoryid, userid, content, description, status, createdBy, createdDate } = contentData;

    
    let sql = `INSERT INTO content (categoryId, sub_categoryId, user_Id, content_Id, status, createdBy, createdDate, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    let values = [categoryid, subcategoryid, userid, content, status, createdBy, createdDate, description];

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
    const { contentId, categoryid, subcategoryid, userid, description, status, createdBy, createdDate } = req.body; 
    
    console.log("Received ContentId:", contentId); 
    console.log("Received data:", { categoryid, subcategoryid, userid, description, status, createdBy, createdDate });

    if (!contentId) {
        return res.status(400).json({ error: "No user ID provided for update" });
    }

    const sql = `UPDATE content SET categoryId=?, sub_categoryId=?, user_Id=?, description=?, status=?, createdBy=?, createdDate=? WHERE ID=?`;
    const values = [categoryid, subcategoryid, userid, description, status, createdBy, createdDate,contentId]; 

    console.log("SQL Query:", sql);
    console.log("SQL Query Parameters:", values);

    edit(sql, values, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }
      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found or not updated" });
      }
      
      console.log(`Updated Rows: ${result.affectedRows}`);

      res.json({ msg: "success", data: { contentId, categoryid, subcategoryid, userid, description, status, createdBy, createdDate } }); 
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
   
    const contentId = req.params.id;

    
    let sql = `DELETE FROM content WHERE ID = ?`;

    
    let values = [contentId];

    
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

router.put('/editstatus/:contentId/status', async (req, res) => {
  try {
      const contentId = req.params.contentId;
      const newStatus = req.body.NewStatus;

      if (!newStatus || !contentId) {
          return res.status(400).json({ error: 'Invalid request parameters' });
      }

      // SQL query and values
      let sql = `UPDATE content SET status = ? WHERE ID = ?`;
      let values = [newStatus, contentId];

      // Execute the update
      edit(sql, values, (error, result) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Database error' });
          }
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Content not found or not updated' });
          }
          res.status(200).json({ message: 'Content status updated successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
