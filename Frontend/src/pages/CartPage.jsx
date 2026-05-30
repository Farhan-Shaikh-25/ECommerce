import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center mt-12">
        <h3 className="text-xl font-medium text-gray-600">Your cart is empty.</h3>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* ... inside CartPage.jsx ... */}
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 m-0 mb-1">{item.name}</h4>
              <span className="text-sm text-gray-500">${item.price} each</span>
            </div>

            {/* The same dynamic quantity widget from the Product Card */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded text-black shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-medium text-gray-900 w-4 text-center text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)} // addToCart handles the logic if we pass the whole item
                  disabled={item.quantity >= 3}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded text-black shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-transparent border-none text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center"
                title="Remove completely"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 font-bold text-xl text-gray-900">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <button 
          onClick={() => navigate('/placeorder')} 
          className="w-full bg-black text-white border-none py-4 rounded-md mt-8 text-base font-semibold cursor-pointer hover:bg-gray-800 transition-colors shadow-sm"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;