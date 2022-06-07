const router = require('express').Router();
const userRoutes = require('./userRoutes');
const playlistRoutes = require('./playlistRoutes');
const questionRoutes = require('./questionRoutes');

// api endpoints
router.use('/users', userRoutes);
// router.use('/playlists', playlistRoutes);
router.use('./questions', questionRoutes);

module.exports = router;
