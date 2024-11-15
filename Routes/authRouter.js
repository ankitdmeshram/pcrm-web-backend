const express = require('express');
const router = express.Router();
const { register, login, verifyToken, isAdmin } = require('../Controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Example of a protected route for admin users only
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;
