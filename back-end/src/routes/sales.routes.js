const { Router } = require('express');
const control = require('../controllers/sale.controller');

const salesRoutes = Router();

salesRoutes.post('/sale', control.create);

module.exports = salesRoutes;
