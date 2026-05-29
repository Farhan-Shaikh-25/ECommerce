import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  // No more 'view' state needed!

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50">
      <Navbar /> {/* No longer passing setView */}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;