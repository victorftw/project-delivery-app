const jwt = require('jsonwebtoken');

const gnToken = (payload, expiresIn = '5d') => {
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn,
  };

  return jwt.sign(payload, 'secret_key', jwtConfig);
};

module.exports = gnToken;
