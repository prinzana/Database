// validators/authValidator.js

const { check, validationResult } = require('express-validator');

// Validation rules for registration
const validateUserRegistration = [
    check('fullname').notEmpty().withMessage('Full Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Add more rules as needed
];

// Middleware to handle validation result
const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUserRegistration, handleValidationResult };
