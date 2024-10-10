// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../db/user.db');

// Connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
// Function to initialize the database (create tables if they don't exist)
const initDb = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS user_profiles (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            community TEXT NOT NULL,
            clan TEXT NOT NULL,
            familyname TEXT NOT NULL,
            sex TEXT NOT NULL,
            profile_picture TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating user_profiles table:', err.message);
        } else {
            console.log('user_profiles table initialized successfully.');
        }
    });
};

module.exports = { db, initDb };
