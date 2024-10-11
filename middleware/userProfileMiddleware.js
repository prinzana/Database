const jwt = require('jsonwebtoken'); 
require('dotenv').config();

// Middleware to authenticate user based on JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer token'

    if (!token) {
        console.error('Access denied. No token provided.'); // Log for debugging
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token using secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info from token to request object
        console.log('Decoded user:', req.user); // For debugging, log decoded user info
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Token verification failed:', error); // Log error for debugging
        return res.status(403).json({ message: 'Invalid token. Please log in again.' }); // Send error if token is invalid
    }
};

// Export the middleware for use in other files
module.exports = authenticateToken;
