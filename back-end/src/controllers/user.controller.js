const service = require('../services/user.service');

const login = async (req, res, next) => {
  try {
    const { status, message } = await service.login(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const next = () => {};

module.exports = { login, next };
