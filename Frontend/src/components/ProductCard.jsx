import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

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
        <button 
          onClick={() => addToCart(product)}
          className="bg-black text-white border-none py-2 px-4 rounded-md cursor-pointer hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;