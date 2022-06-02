const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoute = require('./htmlRoute')

router.use('/api', apiRoutes); // middleware for api routes
router.use('/', htmlRoute) // middleware for html routes

module.exports = router;
