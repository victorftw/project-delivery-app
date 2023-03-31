const { Router } = require('express');
const { login, create, getProducts } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post('/login', login);

userRoutes.post('/register', create);

userRoutes.get('/products', getProducts);

module.exports = userRoutes;
