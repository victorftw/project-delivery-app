const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('./jwt.evaluation.key');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    if (decoded.role !== 'administrator') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = verifyToken;
