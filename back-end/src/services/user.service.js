const { User } = require('../database/models/index');
const { resp, respE } = require('../utils/resp');

const login = async ({ email, password }) => {
  try {
    console.log(email, password);
    const users = await User.findAll();
    const userExists = users.some(
      (e) => e.email === email && e.password === password,
    );
    if (!userExists) return respE(404, 'User not found');
    return resp(200, { token: 'dsfikojpofdsjofdspkfds' });
  } catch (error) {
    console.log(error);
  }
};

const next = () => {};

module.exports = { login, next };
