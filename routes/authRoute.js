// routes/authRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser } = require('../Controllers/authControllers');

// Set up multer for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Registration route
router.post('/register', upload.single('profile-picture'), registerUser);

module.exports = router;
