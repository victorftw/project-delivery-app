const { Router } = require('express');
const {
  create,
  getById,
  updateStatusSales,
  getSales,
  getSalesBySeller,
  getSaleDetails,
} = require('../controllers/sale.controller');

const verify = require('../middlewares/jwt.verify.token');

const salesRoutes = Router();

salesRoutes.post('/sale', verify, create);
salesRoutes.get('/sale/:id', getSales);
salesRoutes.get('/customer/orders/:idVenda', getById);
salesRoutes.get('/seller/orders/details/:id', getSaleDetails);
salesRoutes.get('/seller/orders/:id', getSalesBySeller);
salesRoutes.patch('/customer/orders/:status/:idVenda', updateStatusSales);

module.exports = salesRoutes;
