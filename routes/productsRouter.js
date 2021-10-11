const express = require('express');
const ProductsService = require('../services/productService');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;

  const products = await service.find();

  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const updatedProduct = await service.update(id, body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedId = await service.delete(id);

  res.json({
    message: 'deleted',
    id: deletedId,
  });
});

module.exports = router;
