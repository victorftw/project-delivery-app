const { Router } = require('express');
const { login } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post('/login', login);

module.exports = userRoutes;
