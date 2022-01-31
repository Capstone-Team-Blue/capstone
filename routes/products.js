const express = require('express');
const productsRouter = express.Router();
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../db');
const { requireLogin } = require('./utils');

productsRouter.get('/', async (req, res, next) => {
  try {
    let products = await getAllProducts();
    res.send(products);
  } catch (err) {
    throw err;
  }
})

productsRouter.get('/:productId', async (req,res,next) => {
  try{
    let product = await getProductById(req.params.productId);
    res.send(product);
  }catch(err){
    throw err;
  }
})

module.exports = productsRouter