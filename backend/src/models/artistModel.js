const db = require('../config/db');

exports.addArtist = async (userId, artistId) => {
    try {
        await db.query('INSERT INTO artists (user_id, artist_id) VALUES (?, ?)', [userId, artistId]);
    } catch (error) {
        if (error.code === '1062') {
            return {message: 'Artist already exists in list'};
        }
        throw new Error(error.message);
    }
    return 'Artist added successfully';
};

exports.deleteArtist = async (artistId, userId) => {
    const [result] = await db.query('DELETE FROM artists WHERE artist_id = ? AND user_id = ?', [artistId, userId]);
    return result.affectedRows > 0;
}

exports.getArtists = async (userId) => {
    const [rows] = await db.query('SELECT artist_id FROM artists WHERE user_id = ?', [userId]);
    return rows;
}