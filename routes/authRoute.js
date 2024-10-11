// routes/authRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, loginUser } = require('../Controllers/authControllers'); // Ensure these functions are implemented correctly

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Destination for uploaded files
    },
    filename: function (req, file, cb) {
        // Use a unique filename to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Registration route
router.post('/register', upload.single('profile-picture'), registerUser);

// Login route
router.post('/login', loginUser);

// Example: Protected user profile route
const authenticateToken = require('../middleware/authMiddleware');
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Profile data',
        userId: req.user.userId,
        email: req.user.email
    });
});

module.exports = router;
