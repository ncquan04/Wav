const db = require('../config/db');

exports.findByUsername = async (name) => {
    const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};