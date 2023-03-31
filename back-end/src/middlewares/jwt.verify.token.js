const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('./jwt.evaluation.key');

const verifyToken = (req, _res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
