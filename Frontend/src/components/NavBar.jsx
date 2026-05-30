import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth Context

const Navbar = () => {
  const { cartCount } = useCart();
  const { userInfo, logout } = useAuth(); // 2. Grab user data and logout function

  return (
    <nav className="flex justify-between items-center py-4 px-6 sm:px-8 border-b border-gray-200 bg-white sticky top-0 z-10">
      <Link 
        to="/"
        className="flex items-center gap-2 m-0 cursor-pointer text-xl font-bold text-gray-900 decoration-transparent" 
      >
        <ShoppingBag className="text-black" /> MinimalStore
      </Link>
      
      <div className="flex items-center gap-6">
        
        {/* Only show Admin link if user is logged in AND is an admin */}
        {userInfo && userInfo.isAdmin && (
          <Link 
            to="/admin"
            className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium text-gray-500 hover:text-black transition-colors decoration-transparent"
          >
            <Settings size={18} /> Admin
          </Link>
        )}

        <Link 
          to="/cart"
          className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-base font-medium text-gray-700 hover:text-black transition-colors decoration-transparent"
        >
          <ShoppingCart size={20} /> Cart ({cartCount})
        </Link>

        {/* Dynamic Login / Logout Button */}
        {userInfo ? (
          <button 
            onClick={logout}
            className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <Link 
            to="/login"
            className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium text-gray-500 hover:text-black transition-colors decoration-transparent"
          >
            <UserIcon size={18} /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;