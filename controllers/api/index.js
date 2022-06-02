const router = require('express').Router();
const userRoutes = require('./userRoutes');
const randomdongRoutes = require('./randomsongRoutes')

router.use('/users', userRoutes);
router.use('/randomsongs', randomdongRoutes);

module.exports = router;
