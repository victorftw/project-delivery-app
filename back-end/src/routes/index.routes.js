const { Router } = require('express');
const userRoutes = require('./user.routes');
const saleRoutes = require('./sale.routes');

const router = Router();

router.use(userRoutes);
router.use(saleRoutes);

module.exports = router;
