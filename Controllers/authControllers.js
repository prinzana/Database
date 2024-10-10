// controllers/authController.js
const bcrypt = require('bcrypt');
const { findUserByEmail, createUser } = require('../models/User'); // Adjust this import based on your model structure

const registerUser = async (req, res) => {
    const { fullname, email, password, community, clan, familyname, sex } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' }); // Added success: false
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create user profile directly in the user_profiles table
        const userId = await createUser(fullname, email, hashedPassword, community, clan, familyname, sex, profilePicture);
    
        return res.status(201).json({ success: true, message: 'User registered successfully!' }); // Added success: true
    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' }); // Added success: false
    }
    
};



module.exports = { registerUser };
