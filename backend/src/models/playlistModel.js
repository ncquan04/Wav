const db = require('../config/db');

exports.findByUserId = async (userId) => {
    const [rows] = await db.query('SELECT * FROM playlists WHERE user_id = ?', [userId]);
    return rows;
}

exports.create = async (userId, name) => {
    const [result] = await db.query('INSERT INTO playlists (user_id, name) VALUES (?, ?)', [userId, name]);
    return {id: result.insertId, userId, name};
}

exports.deleteById = async (playlistId, userId) => {
    const [result] = await db.query('DELETE FROM playlists WHERE id = ? AND user_id = ?', [playlistId, userId]);
    return result.affectedRows > 0;
}