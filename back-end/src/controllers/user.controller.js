const service = require('../services/user.service');

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

module.exports = { login, create, getProducts, get };
