const artistService = require('../services/artistService');

exports.getArtists = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const artists = await artistService.getArtists(userId);
        res.status(200).json({ success: true, artists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.addArtist = async (req, res) => {
    try {
        const { userId, artistId } = req.body;
        if (!userId || !artistId) {
            return res.status(400).json({ success: false, message: 'User ID and artist ID are required' });
        }
        await artistService.addArtist(userId, artistId);
        res.status(201).json({ success: true, message: 'Artist added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteArtist = async (req, res) => {
    try {
        const { artistId, userId } = req.body;
        if (!artistId || !userId) {
            return res.status(400).json({ success: false, message: 'Artist ID and user ID are required' });
        }
        await artistService.deleteArtist(artistId, userId);
        res.status(200).json({ success: true, message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}