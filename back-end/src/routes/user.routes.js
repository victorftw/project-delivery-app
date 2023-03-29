const { Router } = require('express');
const { login, create } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post('/login', login);

userRoutes.post('/register', create);

module.exports = userRoutes;
