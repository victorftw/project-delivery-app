const md5 = require('md5');
const { User, Product } = require('../database/models/index');
const { resp, respE } = require('../utils/resp');
const gnToken = require('../jwt/sing');

const login = async ({ email, password }) => {
  try {
    const hashPass = md5(password);
    const users = await User.findAll();
    const user = users.find((e) => e.email === email && e.password === hashPass);

    if (!user) return respE(404, 'User not found');

    const token = gnToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const { name, role } = user;
    return resp(200, { token, name, email, role });
  } catch (error) {
    console.log(error);
  }
};

const create = async (user) => {
  const users = await User.findAll();
  const foundUserEmail = users.find((element) => element.email === user.email);
  const foundUserName = users.find((element) => element.name === user.name);

  if (foundUserEmail || foundUserName) {
    return respE(409, 'User already exists');
  }

  const hashPassword = md5(user.password);
  
  const createdUser = await User.create(
    { ...user, password: hashPassword },
  );

  return resp(201, createdUser);
};

const getProducts = async () => {
    const users = await Product.findAll();
    return resp(201, users);
};

const get = async () => {
  const users = await User.findAll();
  return resp(200, users);
};

const adminRegister = async (body) => {
  const { name, email, password, role } = body;

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: md5(password),
        role,
      },
    });
  
    const { password: _, ...newUserWithoutPassword } = newUser.dataValues;
  
    return { data: newUserWithoutPassword, created };
};

const deleteUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};

module.exports = { login, create, getProducts, get, adminRegister, deleteUserById };
