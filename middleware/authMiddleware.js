// middleware/authMiddleware.js

// Middleware placeholder for future token validation, authorization, etc.
const authMiddleware = (req, res, next) => {
    // Logic for authentication will go here in the future
    next();
};

module.exports = { authMiddleware };

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer token format

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info from token to request object
        next(); // Move to the next middleware
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
