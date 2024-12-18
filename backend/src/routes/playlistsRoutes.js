const express = require('express');
const playlistController = require('../controllers/playlistController');
const router = express.Router();

router.post('/', playlistController.getUserPlaylists);
router.post('/create', playlistController.createPlaylist);
router.post('/delete', playlistController.deletePlaylist);
router.get('/songs/:playlistId', playlistController.getPlaylistSongs);
router.post('/add-song', playlistController.addSongToPlaylist);

module.exports = router;