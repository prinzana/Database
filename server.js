require('dotenv').config();
const express = require('express');

// server.js
const { initDb } = require('./config/database');
const authRoutes = require('./routes/authRoute');

// Initialize the app
const app = express();

// Initialize the database
initDb();

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like profile pictures)
app.use('/public', express.static('public'));

// Use authentication routes
app.use('/api/users', authRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Changed PORT to port
});
