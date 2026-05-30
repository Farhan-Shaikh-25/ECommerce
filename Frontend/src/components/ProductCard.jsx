import { Minus, Plus } from 'lucide-react'; // Import the new icons
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  // Grab the 'cart' state and the new 'decreaseQuantity' function
  const { cart, addToCart, decreaseQuantity } = useCart();

  // Check if this specific product is already in the cart
  const cartItem = cart.find((item) => item._id === product._id);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
      </div>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-lg text-gray-900">${product.price}</span>
        
        {/* Conditional Rendering: Show controls if in cart, otherwise show standard Add button */}
        {cartItem ? (
          <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
            <button 
              onClick={() => decreaseQuantity(product._id)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded text-black shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="font-medium text-gray-900 w-4 text-center">
              {cartItem.quantity}
            </span>
            
            <button 
              onClick={() => addToCart(product)}
              disabled={cartItem.quantity >= 3}
              className="w-8 h-8 flex items-center justify-center bg-white rounded text-black shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(product)}
            className="bg-black text-white border-none py-2 px-4 rounded-md cursor-pointer hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;