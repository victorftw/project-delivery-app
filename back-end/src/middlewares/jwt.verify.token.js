const jwt = require('jsonwebtoken');

const verifyToken = (req, _res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
