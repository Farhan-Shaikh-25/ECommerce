import { Link } from 'react-router-dom'; // 1. Import Link
import { ShoppingBag, ShoppingCart, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="flex justify-between items-center py-4 px-6 sm:px-8 border-b border-gray-200 bg-white sticky top-0 z-10">
      {/* 2. Replace h2 with Link to="/" */}
      <Link 
        to="/"
        className="flex items-center gap-2 m-0 cursor-pointer text-xl font-bold text-gray-900 decoration-transparent" 
      >
        <ShoppingBag className="text-black" /> MinimalStore
      </Link>
      
      <div className="flex items-center gap-6">
        {/* 3. Replace button with Link to="/admin" */}
        <Link 
          to="/admin"
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-medium text-gray-500 hover:text-black transition-colors decoration-transparent"
        >
          <Settings size={18} /> Admin
        </Link>

        {/* 4. Replace button with Link to="/cart" */}
        <Link 
          to="/cart"
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-base font-medium text-gray-700 hover:text-black transition-colors decoration-transparent"
        >
          <ShoppingCart size={20} /> Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;