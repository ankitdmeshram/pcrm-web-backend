// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to the request object
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

// Admin Role Check Middleware
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.roles || !req.user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next(); // User is an admin, proceed
};

module.exports = { verifyToken, isAdmin };
