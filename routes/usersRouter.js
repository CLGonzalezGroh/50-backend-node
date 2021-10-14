const express = require('express');
const UserService = require('../services/userService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/userSchema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  // const { limit, offset } = req.query;
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUser = await service.update(id, data);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
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
