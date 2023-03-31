const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('./jwt.evaluation.key');

const gnToken = (payload, expiresIn = '5d') => {
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn,
  };

  return jwt.sign(payload, secretKey, jwtConfig);
};

module.exports = gnToken;
