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

exports.getPlaylistSongs = async (playlistId) => {
    if (!playlistId) {
        throw new Error('Playlist ID is required');
    }
    return await playlistModel.findSongsByPlaylistId(playlistId);
}

exports.addSongToPlaylist = async (playlistId, songId) => {
    const isAdded = await playlistModel.addSongToPlaylist(playlistId, songId);
    if (!isAdded) {
        throw new Error('Song already exists in playlist');
    }
}