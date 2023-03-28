const { User } = require('../database/models/index');

// User.findAll().then((res) => console.log(res)).catch((e) => console.log(e));

const login = async () => {
  try {
    const users = await User.findByPk(1);
    return users;
  } catch (error) {
    console.log(error);
  }
};

const next = () => {};

module.exports = { login, next };
