const express = require('express');
const authenticateToken = require('../middleware/userProfileMiddleware'); // Token-based authentication middleware
const userProfileController = require('../Controllers/userProfileController');

const router = express.Router();

// Protected route to fetch user profile
router.get('/profile', authenticateToken, userProfileController.getUserProfile);

// Protected route to update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { fullname, email, community, clan, familyname, sex, profile_picture } = req.body;

    try {
        const updatedFields = { fullname, email, community, clan, familyname, sex, profile_picture };
        await userProfileController.updateUserProfile(userId, updatedFields);
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'An error occurred during the profile update.' });
    }
});

module.exports = router;
