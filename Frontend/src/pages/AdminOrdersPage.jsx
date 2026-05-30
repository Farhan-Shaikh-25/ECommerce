import { useState, useEffect } from 'react';
import { Check, X, Eye } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosClient.get('/orders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading Orders...</div>;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.user && order.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {order.isPaid ? (
                    <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full w-6 h-6">
                      <Check size={14} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center bg-red-100 text-red-800 rounded-full w-6 h-6">
                      <X size={14} />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {order.isDelivered ? (
                    <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full w-6 h-6">
                      <Check size={14} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center bg-red-100 text-red-800 rounded-full w-6 h-6">
                      <X size={14} />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => alert(`View details for Order ${order._id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-flex items-center gap-1"
                  >
                    <Eye size={16} /> <span className="hidden sm:inline">Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders have been placed yet.</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;