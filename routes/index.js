var express = require('express');
var router = express.Router();

const {Select, Query } = require("./repository/database");


// GET home page
router.get('/', function(req, res, next) {
    res.render('indexlayout', { title: 'Express' });
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }

        console.log("Received login request:", req.body);

        const checkUserSql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        const checkUserValues = [username, password];

        const users = await Query(checkUserSql, checkUserValues);

        console.log("Query result:", users);

        if (users.length === 0) {
            console.log("Invalid login attempt!");
            return res.status(400).json({ msg: "Invalid username or password" });
        }

        const user = users[0];
        req.session.user = user.username; // Storing the username in the session

        res.json({ msg: "Login successful", data: user });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get('/user', (req, res) => {
    if (req.session.user) {
        res.redirect('/users');
    } else {
        res.redirect('/');
    }
});


module.exports = router;