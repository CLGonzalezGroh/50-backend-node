const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  // const { limit, offset } = req.query;
  const users = service.find();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});

module.exports = router;
