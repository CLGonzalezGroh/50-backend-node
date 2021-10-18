const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    data.user.password = hash;
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: ['user'],
    });

    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user', 'orders'],
    });
    if (!customer) {
      throw boom.notFound('El Cliente no existe');
    }

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const updatedCustomer = await customer.update(changes);

    return updatedCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return id;
  }
}

module.exports = CustomerService;
