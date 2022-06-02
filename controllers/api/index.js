const router = require('express').Router();
const userRoutes = require('./userRoutes');
const playlistRoutes = require('./playlistRoutes');
const questonRoutes = require('./questionRoutes');
const { route } = require('./userRoutes');

// api endpoints
router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
route.use('./questions', questonRoutes);

module.exports = router;
