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

exports.findSongsByPlaylistId = async (playlistId) => {
    const [rows] = await db.query('SELECT song_id FROM playlist_songs WHERE playlist_id = ?', [playlistId]);
    return rows.map(row => row.song_id);
}

exports.addSongToPlaylist = async (playlistId, songId) => {
    try {
        await db.query('INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)', [playlistId, songId]);
    } catch (error) {
        if (error.code === '1062') {
            return {message: 'Song already exists in playlist'};
        }
        throw new Error('Song already exists in playlist');
    }
    return 'Song added successfully';
}

exports.removeSongFromPlaylist = async (playlistId, songId) => {
    const [result] = await db.query('DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?', [playlistId, songId]);
    return result.affectedRows > 0;
};