const { Sale, User, Product, SaleProduct } = require('../database/models');
const { resp, respE } = require('../utils/resp');

const create = async (body) => {
  const [sale, products] = body;
  const createdSale = await Sale.create(sale);
  const productsFormat = products.map((e) => ({
    saleId: createdSale.id,
    productId: e.id,
    quantity: e.quantity,
  }));

  await SaleProduct.bulkCreate(productsFormat);

  return resp(201, createdSale);
};

const getSales = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });
  return resp(200, sales);
};

const salesById = async (id) => {
  const sale = await Sale.findOne({
      where: { id },
      include: [{
          model: User,
          as: 'seller',
          attributes: ['name'],
      }, {
          model: Product, as: 'products',
      }],
  });
  return resp(200, sale);
};

const updateStatusSales = async (id) => {
  try {
      const updatedSale = await Sale.update({ status: 'ENTREGUE' }, { where: { id } });
      return resp(200, updatedSale);
  } catch (error) {
      return respE(400, error);
  }
};

module.exports = {
  create,
  getSales,
  salesById,
  updateStatusSales,
};
