const service = require('../services/user.service');

const login = async (req, res) => {
  const { status, message } = await service.login(req.body);
  res.status(status).json(message);
};

const next = () => {};

module.exports = { login, next };
