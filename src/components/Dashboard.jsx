"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    gallery: 0,
    tags: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, galleryRes, tagsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/products`),
          axios.get(`${API_BASE_URL}/api/galleries`),
          axios.get(`${API_BASE_URL}/api/gtm-tags`),
        ]);

        setStats({
          products: productsRes.data.products?.length || 0,
          gallery: galleryRes.data.galleries?.length || 0,
          tags: tagsRes.data.tags?.length || 0,
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

        activities.sort((a, b) => b.time - a.time);

        setRecentActivities(activities);
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
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
    <div className="min-h-screen bg-gray-50 p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Admin Access
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Products"
            count={stats.products}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            color="bg-blue-100 text-blue-600"
            addLink="/add-product"
            manageLink="/manage-product"
          />

          <DashboardCard
            title="Gallery"
            count={stats.gallery}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            color="bg-purple-100 text-purple-600"
            addLink="/addgallery"
            manageLink="/manage-gallery"
          />

          <DashboardCard
            title="GTM Tags"
            count={stats.tags}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            color="bg-green-100 text-green-600"
            addLink="/addgtmtag"
            manageLink="/managegtmtag"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-3 md:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, idx) => (
                <div key={idx} className="px-3 md:px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mt-1 mr-3 rounded-full p-1 ${activity.type === "product" ? "bg-blue-100 text-blue-600" : activity.type === "gallery" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"}`}>
                      {activity.type === "product" ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      ) : activity.type === "gallery" ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              <div className="px-6 py-12 text-center">
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
    </div>
  );
};

const DashboardCard = ({ title, count, icon, color, addLink, manageLink }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
    <div className="p-2 md:p-6">
      <div className="flex items-center justify-between">
        <div className={`flex-shrink-0 rounded-lg p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5 text-right">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-6 py-3 flex justify-between space-x-3">
      <Link
        to={addLink}
        className="flex-1 text-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        Add New
      </Link>
      <Link
        to={manageLink}
        className="flex-1 text-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
      >
        Manage
      </Link>
    </div>
  </div>
);

export default Dashboard;