import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, cartTotal } = useCart();

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
        {cart.map((item) => (
          <div 
            key={item._id} 
            className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-800 m-0 mb-1">{item.name}</h4>
              <span className="text-sm text-gray-500">
                ${item.price} <span className="mx-1 text-gray-400">x</span> {item.quantity}
              </span>
            </div>
            <button 
              onClick={() => removeFromCart(item._id)}
              className="bg-transparent border-none text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 font-bold text-xl text-gray-900">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        
        <button className="w-full bg-black text-white border-none py-4 rounded-md mt-8 text-base font-semibold cursor-pointer hover:bg-gray-800 transition-colors shadow-sm">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;