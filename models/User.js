const { db } = require('../config/database');

// Function to find a user by email
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM user_profiles WHERE email = ?', [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Function to create a new user profile
const createUser = async (fullname, email, password, community, clan, familyname, sex, profilePicture) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO user_profiles (fullname, email, password, community, clan, familyname, sex, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [fullname, email, password, community, clan, familyname, sex, profilePicture], function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID); // Return the newly created user's ID
        });
    });
};

module.exports = { findUserByEmail, createUser }; // Removed insertUserProfile
