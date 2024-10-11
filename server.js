require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/database');
const authRoutes = require('./routes/authRoute');
const userProfileRoutes = require('./routes/userProfileRoute'); // Ensure this file exists

// Initialize the app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Initialize the database
initDb();

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like profile pictures)
app.use('/public', express.static('public'));

// Use authentication routes
app.use('/api/users', authRoutes);

// Use user profile routes
app.use('/api/users', userProfileRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
