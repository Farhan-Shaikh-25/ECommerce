import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductCreatePage from './pages/ProductCreatePage';

function App() {
  const { userInfo } = useAuth(); // Pull userInfo to check auth status at the top level

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50">

      {/* Hide the Navbar completely if the user is not logged in */}
      {userInfo && !userInfo.isAdmin && <Navbar />}

      {userInfo?.isAdmin && (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-center gap-6">
          <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Manage Orders
          </Link>
        </div>
      )}

      <main>
        <Routes>
          {/* 1. Public Login Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 2. The Root Route (Gatekeeper) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* If they are an admin, force them to the admin dashboard. Otherwise, show the store. */}
                {userInfo?.isAdmin ? <Navigate to="/admin" replace /> : <HomePage />}
              </ProtectedRoute>
            }
          />

          {/* 3. Protected Customer Route */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* 4. Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeorder"
            element={
              <ProtectedRoute>
                <PlaceOrderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/product/add"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProductCreatePage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/product/:id/edit"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProductEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </div>
  );
}

export default App;