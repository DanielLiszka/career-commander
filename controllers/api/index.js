const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const resumeRoutes = require('./resume-routes.js');
const applicationRoutes = require('./application-routes');
// const companyRoutes = require('./company-routes.js');
// const positionRoutes = require('./position-routes.js');
// const managerRoutes = require('./manager-routes');

router.use('/users', userRoutes);
router.use('/resume', resumeRoutes);
router.use('/applications', applicationRoutes);
// router.use('/companies', companyRoutes);
// router.use('/positions', positionRoutes);
// router.use('/managers', managerRoutes);

module.exports = router;
