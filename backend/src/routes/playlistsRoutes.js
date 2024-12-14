const express = require('express');
const playlistController = require('../controllers/playlistController');
const router = express.Router();

router.post('/', playlistController.getUserPlaylists);
router.post('/create', playlistController.createPlaylist);
router.post('/delete', playlistController.deletePlaylist);

module.exports = router;