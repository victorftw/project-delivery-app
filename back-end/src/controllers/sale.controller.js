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

const getSalesBySeller = async (req, res, next) => {
  try {
    const { status, message } = await service.getSalesBySeller(req.params.id);
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
  const { idVenda, status: newState } = req.params;
  try {
    const { status } = await service.updateStatusSales(idVenda, newState);
    res.status(status).json();
  } catch (error) {
    next(error);
  }
};

const getSaleDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, message } = await service.getSaleDetails(id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getById,
  getSales,
  updateStatusSales,
  getSalesBySeller,
  getSaleDetails,
};
