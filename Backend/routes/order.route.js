const express = require('express');
const orderRouter = express.Router();
const { addOrderItems, getOrders } = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware'); // Import admin middleware

// POST is for customers creating an order
// GET is for admins viewing all orders
orderRouter.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

module.exports = orderRouter;