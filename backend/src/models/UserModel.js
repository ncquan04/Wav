const db = require('../config/db');

exports.findByUsername = async (name) => {
    const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};

exports.createUser = async (name, password) => {
    const [result] = await db.query(
        'INSERT INTO users (name, password) VALUES (?, ?)',
        [name, password]
    );

    return {id: result.insertId, name};
};