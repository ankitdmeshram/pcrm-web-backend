const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../Controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);
router.post('/reset-password', resetPassword);

module.exports = router;
