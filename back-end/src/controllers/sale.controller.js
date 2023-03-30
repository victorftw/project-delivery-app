const service = require('../services/sales.service');

const create = async (req, res, next) => {
  try {
    const { status, message } = await service.create(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const getSales = async (req, res, next) => {
  try {
    const { status, message } = await service.getSales(req.params.id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getSales,
};
