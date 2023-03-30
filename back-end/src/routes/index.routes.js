const { Router } = require('express');
const userRoutes = require('./user.routes');
const salesRoutes = require('./sales.routes');

const router = Router();

router.use(userRoutes);
router.use(salesRoutes);

module.exports = router;
