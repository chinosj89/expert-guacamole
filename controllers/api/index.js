const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userProjectRoutes = require('./userProjectRoutes');

router.use('/users', userRoutes);
router.use('/projects', userProjectRoutes);


module.exports = router;
