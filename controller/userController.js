const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Sample in-memory database
let users = [];

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// POST a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT (update) an existing user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    users = users.filter(user => user.id !== userId);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
