'use client';

import { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (loading) {
    return <Layout title="Orders"><p>Loading orders...</p></Layout>;
  }

  return (
    <Layout title="Admin Orders">
      <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="border-b">
            <tr>
              <th className="px-5 py-3 text-left">ID</th>
              <th className="px-5 py-3 text-left">CUSTOMER</th>
              <th className="px-5 py-3 text-left">DATE</th>
              <th className="px-5 py-3 text-left">TOTAL</th>
              <th className="px-5 py-3 text-left">PAID</th>
              <th className="px-5 py-3 text-left">TID / INFO</th>
              <th className="px-5 py-3 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-5">{order._id.substring(20, 24)}</td>
                <td className="p-5">{order.customerInfo.name}</td>
                <td className="p-5">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-5">${order.totalPrice.toFixed(2)}</td>
                <td className="p-5">{order.isPaid ? 'Yes' : 'No'}</td>
                <td className="p-5">{order.paymentMethod !== 'COD' ? order.transactionId : 'N/A'}</td>
                <td className="p-5">
                  {/* --- UPDATED SELECT OPTIONS --- */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Verified & Paid">Verified & Paid</option>
                  </select>
                  {/* --- END OF UPDATED SELECT OPTIONS --- */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}