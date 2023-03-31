const { Router } = require('express');
const { create, getById, updateStatusSales } = require('../controllers/sale.controller');

const verify = require('../middlewares/jwt.verify.token');

const salesRoutes = Router();

salesRoutes.get('/customer/orders/:idVenda', getById);
salesRoutes.post('/sale', verify, create);
salesRoutes.patch('/customer/orders/:idVenda', updateStatusSales);

module.exports = salesRoutes;