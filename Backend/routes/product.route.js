const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/product.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// New route for specific product IDs
router.route('/:id')
  .get(getProductById) // <-- Add the GET method here
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;