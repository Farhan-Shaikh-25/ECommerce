const Product = require('../models/product.model');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public (Normally you'd protect this route for admins only)
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: 'Please include all fields' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
};