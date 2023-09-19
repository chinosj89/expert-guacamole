const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const userProjectRoutes = require('./userProjectRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', projectRoutes);
router.use('/users/projects', userProjectRoutes);

module.exports = router;
