const artistModel = require('../models/artistModel');

exports.addArtist = async (userId, artistId) => {
    const isAdded = await artistModel.addArtist(userId, artistId);
    if (!isAdded) {
        throw new Error('Artist already exists in list');
    }
};

exports.deleteArtist = async (artistId, userId) => {
    const isDeleted = await artistModel.deleteArtist(artistId, userId);
    if (!isDeleted) {
        throw new Error('Artist not found');
    }
};

exports.getArtists = async (userId) => {
    return await artistModel.getArtists(userId);
}