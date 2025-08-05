"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    gallery: 0,
    tags: 0,
    orders: 0,
    revenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
   const fetchDashboardData = async () => {
  setIsLoading(true);
  try {
    const [productsRes, galleryRes, tagsRes, ordersRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/api/products`),
      axios.get(`${API_BASE_URL}/api/galleries`),
      axios.get(`${API_BASE_URL}/api/gtm-tags`),
      axios.get(`${API_BASE_URL}/api/orders/getall`),
    ]);

    // Make sure that ordersRes.data is an array before using .reduce
    const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    setStats({
      products: productsRes.data.products?.length || 0,
      gallery: galleryRes.data.galleries?.length || 0,
      tags: tagsRes.data.tags?.length || 0,
      orders: orders.length || 0,
      revenue: totalRevenue,
    });

    const activities = [];

    if (productsRes.data.products?.length > 0) {
      const recentProduct = productsRes.data.products[0];
      activities.push({
        type: "product",
        message: `New product "${recentProduct.productName}" was added`,
        time: new Date(recentProduct.createdAt || Date.now()),
      });
    }

    if (galleryRes.data.galleries?.length > 0) {
      const recentGallery = galleryRes.data.galleries[0];
      activities.push({
        type: "gallery",
        message: `Gallery updated with ${recentGallery.images?.length || 0} images`,
        time: new Date(recentGallery.createdAt || Date.now()),
      });
    }

    if (tagsRes.data.tags?.length > 0) {
      const recentTag = tagsRes.data.tags[0];
      activities.push({
        type: "tag",
        message: `GTM Tag "${recentTag.name}" was added`,
        time: new Date(recentTag.createdAt || Date.now()),
      });
    }

    if (orders.length > 0) {
      const recentOrder = orders[0];
      activities.push({
        type: "order",
        message: `New order #${recentOrder._id.slice(-6)} for ₹${recentOrder.total}`,
        time: new Date(recentOrder.createdAt || Date.now()),
      });
    }

    activities.sort((a, b) => b.time - a.time);
    setRecentActivities(activities.slice(0, 5));
    setError(null);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    setError("Failed to load dashboard data. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



    fetchDashboardData();
  }, [API_BASE_URL, timeRange]);

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-600 mb-3"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1.5 text-sm font-medium rounded-l-lg ${timeRange === "week" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1.5 text-sm font-medium ${timeRange === "month" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-3 py-1.5 text-sm font-medium rounded-r-lg ${timeRange === "year" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                Year
              </button>
            </div>
            
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Admin Access
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Revenue"
            value={formatCurrency(stats.revenue)}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend="up"
            trendValue="12%"
            color="bg-blue-50"
            link="/manage-orders"
          />

          <DashboardCard
            title="Total Orders"
            value={stats.orders}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            trend="up"
            trendValue="8%"
            color="bg-green-50"
            link="/manage-orders"
          />

          <DashboardCard
            title="Total Products"
            value={stats.products}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            trend="down"
            trendValue="3%"
            color="bg-purple-50"
            link="/manage-products"
          />

          <DashboardCard
            title="Gallery Items"
            value={stats.gallery}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            trend="up"
            trendValue="15%"
            color="bg-orange-50"
            link="/manage-gallery"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <Link to="/manage-orders" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3].map((order) => (
                <div key={order} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Order #ORD{1000 + order}</h3>
                      <p className="text-xs text-gray-500 mt-1">Customer Name • {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">{formatCurrency(1500 + (order * 500))}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, idx) => (
                  <div key={idx} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 mt-1 mr-3 rounded-full p-2 ${activity.type === "product" ? "bg-blue-100 text-blue-600" : activity.type === "gallery" ? "bg-purple-100 text-purple-600" : activity.type === "order" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                        {activity.type === "product" ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        ) : activity.type === "gallery" ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        ) : activity.type === "order" ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 break-words whitespace-normal">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{getRelativeTime(activity.time)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Your recent activities will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            title="Add Product"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            link="/add-product"
            color="bg-blue-100 text-blue-600"
          />
          <QuickAction
            title="Manage Orders"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            link="/manage-orders"
            color="bg-green-100 text-green-600"
          />
          <QuickAction
            title="Add Gallery"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            link="/addgallery"
            color="bg-purple-100 text-purple-600"
          />
          <QuickAction
            title="Manage GTM Tags"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            link="/manage-gmt"
            color="bg-orange-100 text-orange-600"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, trend, trendValue, color, link }) => (
  <Link to={link} className="group">
    <div className={`${color} rounded-xl p-6 shadow-sm transition-all duration-200 group-hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {trend === "up" ? (
              <svg className="-ml-0.5 mr-1 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="-ml-0.5 mr-1 h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {trendValue}
          </span>
          <span className="ml-2 text-xs text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  </Link>
);

const QuickAction = ({ title, icon, link, color }) => (
  <Link to={link} className="group">
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 transition-all duration-200 group-hover:shadow-md">
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">Click to access</p>
        </div>
      </div>
    </div>
  </Link>
);

export default Dashboard;