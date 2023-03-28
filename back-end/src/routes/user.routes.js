const { Router } = require('express');
const { login } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.get('/login', login);

module.exports = userRoutes;
