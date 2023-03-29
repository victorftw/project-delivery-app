const md5 = require('md5');
const { User } = require('../database/models/index');
const { resp, respE } = require('../utils/resp');

const login = async ({ email, password }) => {
  try {
    const hashPass = md5(password);
    const users = await User.findAll();
    const userExists = users.some(
      (e) => e.email === email && e.password === hashPass,
    );
    if (!userExists) return respE(404, 'User not found');
    return resp(200, { token: 'dsfikojpofdsjofdspkfds' });
  } catch (error) {
    console.log(error);
  }
};

const next = () => {};

module.exports = { login, next };
