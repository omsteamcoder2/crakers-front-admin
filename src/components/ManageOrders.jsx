"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrder, deleteOrder } from "../services/OrderServices";
import { X, CheckCircle, Loader2, Trash2, Eye, ChevronDown, ChevronUp, Search, Calendar } from "lucide-react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
const [orderToDelete, setOrderToDelete] = useState(null);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, dateFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.contact.name.toLowerCase().includes(term) || 
        order.contact.phone.includes(term)
      );
    }

    // Apply date filter
    if (dateFilter.startDate && dateFilter.endDate) {
      const start = new Date(dateFilter.startDate);
      const end = new Date(dateFilter.endDate);
      end.setHours(23, 59, 59, 999); // Include entire end day

      result = result.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(result);
  };
const handleDeleteClick = (order) => {
  setOrderToDelete(order);
  setConfirmModalOpen(true);
};

const confirmDeleteOrder = async () => {
  try {
    await deleteOrder(orderToDelete._id);  // Call the delete API
    await fetchOrders();  // Refresh the orders list
    setConfirmModalOpen(false);  // Close the confirmation modal
    setOrderToDelete(null);  // Clear the order to delete
  } catch (err) {
    console.error("Failed to delete order", err);
  }
};

  const handleStatusUpdate = async (id, field, newValue) => {
    try {
      setUpdatingId(id);
      const updateData = field === "payment" 
        ? { paymentStatus: newValue } 
        : { status: newValue };
      await updateOrder(id, updateData);
      await fetchOrders();
    } catch (err) {
      console.error("Failed to update order", err);
    } finally {
      setUpdatingId(null);
      setSelectedOrder(null);
      setExpandedRows({});
    }
  };

  const toggleRowExpand = (orderId) => {
    setExpandedRows(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-1 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
        Manage Orders
      </h1>

      {/* Search and Filter Bar */}
      <div className="mb-4 space-y-3 sm:space-y-0 sm:flex sm:space-x-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            Filter by Date
          </button>
          
          {showDateFilter && (
            <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-white rounded-md shadow-lg z-10 p-4 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={dateFilter.startDate}
                    onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={dateFilter.endDate}
                    onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
                    min={dateFilter.startDate}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setDateFilter({ startDate: "", endDate: "" });
                      setShowDateFilter(false);
                    }}
                    className="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowDateFilter(false)}
                    className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {dateFilter.startDate && dateFilter.endDate && (
        <div className="mb-4 text-sm text-gray-600">
          Showing orders from {formatDate(dateFilter.startDate)} to {formatDate(dateFilter.endDate)}
          <button 
            onClick={() => setDateFilter({ startDate: "", endDate: "" })}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            (Clear)
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 text-sm">
          {error}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded p-4 text-gray-600 text-center">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Mobile View - Cards */}
          <div className="sm:hidden space-y-3">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white p-2 md:p-4 rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.contact.name}</h3>
                    <p className="text-sm text-gray-500">{order.contact.phone}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.total}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className={`text-xs px-2 py-0.5 rounded ${getPaymentColor(order.payment?.status || "pending")}`}>
                    {order.payment?.status || "pending"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleRowExpand(order._id)}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="View details"
                    >
                      {expandedRows[order._id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {expandedRows[order._id] && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-3 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Customer Address</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{order.contact.address}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Order Items</h4>
                        {order.products.map((p) => (
                          <div key={p.productCode} className="mb-2 border-b border-gray-100 pb-2">
                            <p className="font-medium text-gray-800">
                              {p.productName} (x{p.quantity})
                            </p>
                            <p className="text-gray-600">₹{p.price * p.quantity}</p>
                            {p.boxQuantity && (
                              <p className="text-xs text-gray-500">
                                {p.boxQuantity} Box ({p.piecesPerBox} pcs)
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Status</label>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order._id, "status", e.target.value)}
                            disabled={updatingId === order._id}
                            className={`text-xs w-full ${getStatusColor(order.status)} rounded px-2 py-1 border border-transparent`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Payment</label>
                          <select
                            value={order.payment?.status || "pending"}
                            onChange={(e) => handleStatusUpdate(order._id, "payment", e.target.value)}
                            disabled={updatingId === order._id}
                            className={`text-xs w-full ${getPaymentColor(order.payment?.status || "pending")} rounded px-2 py-1 border border-transparent`}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <table className="hidden sm:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <>
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm sm:text-base font-medium text-gray-900">
                          {order.contact.name}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{order.contact.phone}</div>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm sm:text-base font-bold text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, "status", e.target.value)}
                        disabled={updatingId === order._id}
                        className={`text-xs sm:text-sm ${getStatusColor(order.status)} rounded px-2 py-1 border border-transparent focus:border-gray-300`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <select
                        value={order.payment?.status || "pending"}
                        onChange={(e) => handleStatusUpdate(order._id, "payment", e.target.value)}
                        disabled={updatingId === order._id}
                        className={`text-xs sm:text-sm ${getPaymentColor(order.payment?.status || "pending")} rounded px-2 py-1 border border-transparent focus:border-gray-300`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => toggleRowExpand(order._id)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View details"
                        >
                          {expandedRows[order._id] ? (
                            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(order)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete order"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedRows[order._id] && (
                    <tr>
                      <td colSpan="6" className="px-4 py-3 bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                            <p className="text-gray-700">{order.contact.name}</p>
                            <p className="text-gray-700">{order.contact.phone}</p>
                            <p className="text-gray-700 whitespace-pre-wrap">{order.contact.address}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                            {order.products.map((p) => (
                              <div key={p.productCode} className="mb-2 border-b border-gray-100 pb-2">
                                <p className="font-medium text-gray-800">
                                  {p.productName} <span className="font-bold">(x{p.quantity})</span> 
                                </p>
                                <p className="text-gray-600">₹{p.price * p.quantity}</p>
                                {p.boxQuantity && (
                                  <p className="text-xs text-gray-500">
                                    {p.boxQuantity} Box ({p.piecesPerBox} pcs)
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Order #{selectedOrder._id.slice(-6).toUpperCase()}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                    Customer Information
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>{selectedOrder.contact.name}</p>
                    <p>{selectedOrder.contact.phone}</p>
                    <p className="whitespace-pre-wrap">{selectedOrder.contact.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{selectedOrder.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`px-2 py-1 rounded ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span className={`px-2 py-1 rounded ${getPaymentColor(selectedOrder.payment?.status || "pending")}`}>
                        {selectedOrder.payment?.status || "pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product) => (
                    <div key={product.productCode} className="flex justify-between border-b border-gray-100 pb-2">
                      <div>
                        <p className="font-medium text-gray-800">{product.productName}</p>
                        <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                        {product.boxQuantity && (
                          <p className="text-xs text-gray-500">
                            {product.boxQuantity} Box ({product.piecesPerBox} pcs)
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{product.price * product.quantity}</p>
                        <p className="text-sm text-gray-600">₹{product.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
          )}
          
          {confirmModalOpen && orderToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
    <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 border border-orange-200">
      <h2 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">
        Confirm Deletion
      </h2>
      <p className="text-orange-600 text-sm sm:text-base mb-4 sm:mb-6">
        Are you sure you want to delete{" "}
        <strong>{orderToDelete.contact.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3 sm:space-x-4">
        <button
          onClick={() => {
            setConfirmModalOpen(false);
            setOrderToDelete(null);
          }}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-200 text-gray-700 text-sm sm:text-base hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={confirmDeleteOrder}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 text-white text-sm sm:text-base hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageOrders;