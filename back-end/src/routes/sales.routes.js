const { Router } = require('express');
const { create, getById, updateStatusSales, getSales } = require('../controllers/sale.controller');

const verify = require('../middlewares/jwt.verify.token');

const salesRoutes = Router();

salesRoutes.post('/sale', verify, create);
salesRoutes.get('/sale/:id', getSales);
salesRoutes.get('/customer/orders/:idVenda', getById);
salesRoutes.patch('/customer/orders/:idVenda', updateStatusSales);

module.exports = salesRoutes;
