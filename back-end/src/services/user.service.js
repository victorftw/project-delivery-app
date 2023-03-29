const md5 = require('md5');
const { User } = require('../database/models/index');
const { resp, respE } = require('../utils/resp');
const gnToken = require('../jwt/sing');

const login = async ({ email, password }) => {
  try {
    const hashPass = md5(password);
    const users = await User.findAll();
    const user = users.find(
      (e) => e.email === email && e.password === hashPass,
    );
    if (!user) return respE(404, 'User not found');
    const token = gnToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return resp(200, { token });
  } catch (error) {
    console.log(error);
  }
};

const next = () => {};

module.exports = { login, next };
