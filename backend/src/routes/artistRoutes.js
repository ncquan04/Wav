const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

router.post('/', artistController.getArtists);
router.post('/add', artistController.addArtist);
router.post('/delete', artistController.deleteArtist);

module.exports = router;