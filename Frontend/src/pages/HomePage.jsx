import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosClient.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 font-medium animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;