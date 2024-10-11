// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/User'); // Adjust this import based on your model structure
require('dotenv').config(); // To use the .env variables

// User registration
const registerUser = async (req, res) => {
    const { fullname, email, password, community, clan, familyname, sex } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create user profile
        const userId = await createUser(fullname, email, hashedPassword, community, clan, familyname, sex, profilePicture);
    
        return res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Generate JWT token using `user_id` (assuming your table uses `user_id`)
        const token = jwt.sign(
            { userId: existingUser.user_id, email: existingUser.email }, // Use `user_id` instead of `id`
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token with success response
        return res.status(200).json({ success: true, message: 'Login successful!', token });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
    }
};

module.exports = { registerUser, loginUser };
