const { Router } = require('express');
const control = require('../controllers/sale.controller');

const verify = require('../middlewares/jwt.verify.token');

const salesRoutes = Router();

salesRoutes.post('/sale', verify, control.create);

module.exports = salesRoutes;