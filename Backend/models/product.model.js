const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);