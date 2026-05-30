import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const ProductEditPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  // Fetch the existing product data to populate the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosClient.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle the form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await axiosClient.put(`/products/${id}`, {
        name,
        price,
        image,
        description,
      });
      setUpdateLoading(false);
      navigate('/admin'); // Go back to the dashboard on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading product data...</div>;

  return (
    <div className="max-w-xl mx-auto my-10 px-4 sm:px-6">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h2>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
            {/* Live image preview */}
            {image && (
              <img src={image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded border border-gray-200" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full bg-black text-white py-3 mt-2 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {updateLoading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;