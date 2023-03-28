const service = require('../services/user.service');

const login = async (_req, res) => {
  const users = await service.login();
  res.status(200).json(users);
};

const next = () => {};

module.exports = { login, next };
