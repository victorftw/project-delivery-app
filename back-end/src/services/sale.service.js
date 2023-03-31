const { Sale, SaleProduct } = require('../database/models');
const { resp } = require('../utils/resp');

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

const next = () => {};

module.exports = {
  create,
  next,
};
