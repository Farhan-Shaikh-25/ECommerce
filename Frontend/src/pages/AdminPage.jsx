import { useState } from 'react';
import axiosClient from '../api/axiosClient';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the backend POST route
      await axiosClient.post('/products', {
        ...formData,
        price: Number(formData.price), // Ensure price is sent as a number
      });
      setMessage('Product added successfully!');
      setFormData({ name: '', price: '', description: '', image: '' }); // Reset form
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h3>
      
      {message && (
        <div className="mb-4 p-3 text-sm font-medium rounded-md bg-gray-100 text-gray-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors mt-2"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminPage;