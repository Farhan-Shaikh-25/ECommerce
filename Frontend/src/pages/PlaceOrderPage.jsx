import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosClient from '../api/axiosClient';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If the cart is empty, kick them back to the store
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  // Calculate final prices (assuming $10 shipping and 15% tax)
  const shippingPrice = cartTotal > 100 ? 0 : 10; 
  const taxPrice = Number((0.15 * cartTotal).toFixed(2));
  const finalTotal = Number((cartTotal + shippingPrice + taxPrice).toFixed(2));

  // Mock Shipping Address (Normally gathered from a previous form step)
  const shippingAddress = {
    address: '123 Main St',
    city: 'Mumbai',
    postalCode: '400001',
    country: 'India',
  };

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Map the cart items to match the backend schema requirements
      const orderItems = cart.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id
      }));

      // Send the payload to the protected route
      const { data } = await axiosClient.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod: 'Razorpay', // Placeholder for now
        itemsPrice: cartTotal,
        shippingPrice,
        taxPrice,
        totalPrice: finalTotal,
      });

      // Success! Clear the cart and navigate home (or to an Order Details page)
      clearCart();
      alert(`Order Placed Successfully! Order ID: ${data._id}`);
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column: Order Summary */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Shipping To:</h3>
          <p className="text-gray-600">
            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Items:</h3>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-100">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-gray-800">{item.name}</span>
              </div>
              <span className="text-gray-600">{item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Checkout Card */}
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Items</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (15%)</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {error && <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded border border-red-100">{error}</div>}

          <button 
            onClick={placeOrderHandler}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;