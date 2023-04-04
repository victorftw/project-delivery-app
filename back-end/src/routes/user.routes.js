const { Router } = require('express');
const { 
    login,
    create,
    getProducts,
    get,
    adminRegister,
    deleteUserById,
     } = require('../controllers/user.controller');

const verify = require('../middlewares/jwt.verify.adminToken');
const { 
     registerValidation,
     roleValidation,
     fieldsValidation,
     } = require('../middlewares/verify.register');

const userRoutes = Router();

userRoutes.post('/login', login);

userRoutes.post('/register', create);

userRoutes.get('/products', getProducts);

userRoutes.get('/user', get);

userRoutes.post(
    '/admin/register',
    verify,
    fieldsValidation,
    registerValidation,
    roleValidation,
    adminRegister,
    );

userRoutes.delete('/admin/delete/:id', verify, deleteUserById);

module.exports = userRoutes;
