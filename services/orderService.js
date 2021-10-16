const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.findByPk(data.customerId);
    if (!customer) {
      throw boom.notFound('El cliente no existe');
    }
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const order = await models.Order.findByPk(data.orderId);
    if (!order) {
      throw boom.notFound('La orden no existe');
    }
    const product = await models.Product.findByPk(data.productId);
    if (!product) {
      throw boom.notFound('El producto no existe');
    }
    const newItem = await models.OrderProduct.create(data);

    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items'],
    });
    if (!order) {
      throw boom.notFound('La orden no existe');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);

    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();

    return id;
  }
}

module.exports = OrderService;
