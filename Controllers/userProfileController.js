const { db } = require('../config/database');

// Function to get user profile
const getUserProfile = async (req, res) => {
    const { userId } = req.user; // Assuming authenticateToken middleware populates req.user
    try {
        const sql = `SELECT * FROM user_profiles WHERE user_id = ?`;
        db.get(sql, [userId], (err, row) => {
            if (err) {
                console.error('Error fetching user profile:', err);
                return res.status(500).json({ message: 'An error occurred while fetching the profile.' });
            }
            return res.status(200).json(row);
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
};

// Function to update user profile
const updateUserProfile = (userId, updatedFields) => {
    return new Promise((resolve, reject) => {
        const requiredFields = ['fullname', 'email', 'community', 'clan', 'familyname', 'sex', 'profile_picture'];
        const filteredFields = Object.keys(updatedFields).filter(field => requiredFields.includes(field));
        const fields = filteredFields.map(field => `${field} = ?`).join(', ');
        const values = filteredFields.map(field => updatedFields[field]);
        const sql = `UPDATE user_profiles SET ${fields} WHERE user_id = ?`;
        values.push(userId); // Append userId to the values array

        db.run(sql, values, function(err) {
            if (err) {
                console.error('Error during database update:', err);
                return reject(err);
            }
            resolve(this.changes); // Return number of rows updated
        });
    });
};

module.exports = { getUserProfile, updateUserProfile };
