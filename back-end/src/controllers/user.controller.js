const service = require('../services/user.service');
const gnToken = require('../jwt/sing');

const login = async (req, res, next) => {
  try {
    const { status, message } = await service.login(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { status, message } = await service.create(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { status, message } = await service.getProducts(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error.message);
  }
};

const get = async (_req, res, next) => {
  try {
    const { status, message } = await service.get();
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const adminRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
    const newUser = await service.adminRegister({ name, email, password, role });

    if (!newUser.created) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const token = gnToken(newUser.data);
    const response = { ...newUser.data, token };
    return res.status(201).json(response);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await service.deleteUserById(id);
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { login, create, getProducts, get, adminRegister, deleteUserById };
