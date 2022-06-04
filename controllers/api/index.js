const router = require('express').Router();
const userRoutes = require('./userRoutes');
const playlistRoutes = require('./playlistRoutes');
const questonRoutes = require('./questionRoutes');
const { route } = require('./userRoutes'); // Not sure what this does

// api endpoints
router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
router.use('./questions', questonRoutes);

module.exports = router;
