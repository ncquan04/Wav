const playlistModel = require('../models/playlistModel');

exports.getPlaylistByUserId = async (userId) => {
    return await playlistModel.findByUserId(userId);
};

exports.createPlaylist = async (userId, name) => {
    return await playlistModel.create(userId, name);
}

exports.deletePlaylist = async (playlistId, userId) => {
    const isDeleted = await playlistModel.deleteById(playlistId, userId);
    if (!isDeleted) {
        throw new Error('Playlist not found');
    }
}