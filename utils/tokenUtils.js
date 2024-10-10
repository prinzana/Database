// utils/tokenUtils.js

const jwt = require('jsonwebtoken');

// Utility to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Utility to verify JWT token
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
