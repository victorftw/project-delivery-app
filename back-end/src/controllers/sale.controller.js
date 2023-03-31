const service = require('../services/sale.service');

const create = async (req, res, next) => {
  try {
    const { status, message } = await service.create(req.body);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { idVenda } = req.params;
  try {
    const { status, message } = await service.salesById(idVenda);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const updateStatusSales = async (req, res, next) => {
  const { idVenda } = req.params;
  try {
    const { status } = await service.updateStatusSales(idVenda);
    res.status(status).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getById,
  updateStatusSales,
};
