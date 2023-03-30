const { Router } = require('express');
const { login, create, get } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post('/login', login);

userRoutes.post('/register', create);

userRoutes.get('/user', get);

module.exports = userRoutes;
