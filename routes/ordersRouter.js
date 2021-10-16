const express = require('express');
const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/orderSchema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  // const { limit, offset } = req.query;
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newItem = await service.addItem(data);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch(
//   '/:id',
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const data = req.body;
//       const updatedUser = await service.update(id, data);
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedId = await service.delete(id);
      res.status(201).json({
        message: 'deleted',
        id: deletedId,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
