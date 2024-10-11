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

// Function to find a user by ID
const findUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM user_profiles WHERE user_id = ?', [userId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Function to create a new user profile
const createUser = (fullname, email, password, community, clan, familyname, sex, profilePicture) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO user_profiles (fullname, email, password, community, clan, familyname, sex, profile_picture) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [fullname, email, password, community, clan, familyname, sex, profilePicture], function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID); // Return the newly created user's ID
        });
    });
};

// Function to update a user profile
const updateUserProfile = (userId, updatedFields) => {
    return new Promise((resolve, reject) => {
        const requiredFields = ['fullname', 'email', 'community', 'clan', 'familyname', 'sex', 'profile_picture'];
        const filteredFields = Object.keys(updatedFields).filter(field => requiredFields.includes(field));
        const fields = filteredFields.map(field => `${field} = ?`).join(', ');
        const values = filteredFields.map(field => updatedFields[field]);
        values.push(userId); // Append userId to the values array

        const sql = `UPDATE user_profiles SET ${fields} WHERE user_id = ?`;
        db.run(sql, values, function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.changes); // Return number of rows updated
        });
    });
};

module.exports = { findUserByEmail, findUserById, createUser, updateUserProfile };
