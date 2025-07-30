"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    gallery: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch projects count
        const projectsRes = await axios.get(`${API_BASE_URL}/api/projects`);

        // Fetch gallery count
        const galleryRes = await axios.get(`${API_BASE_URL}/api/galleries`);

        // Set stats
        setStats({
          projects: projectsRes.data.projects?.length || 0,
          gallery: galleryRes.data.galleries?.length || 0,
        });

        // Generate recent activities based on the most recent items
        const activities = [];

        // Add recent projects
        if (projectsRes.data.projects && projectsRes.data.projects.length > 0) {
          const recentProject = projectsRes.data.projects[0];
          activities.push({
            type: "project",
            message: `New project "${recentProject.title}" was added`,
            time: new Date(recentProject.createdAt || Date.now()),
            id: recentProject._id,
          });
        }

        // Add recent gallery updates
        if (galleryRes.data.galleries && galleryRes.data.galleries.length > 0) {
          const recentGallery = galleryRes.data.galleries[0];
          activities.push({
            type: "gallery",
            message: `Gallery updated with ${
              recentGallery.images?.length || 0
            } new images`,
            time: new Date(recentGallery.createdAt || Date.now()),
            id: recentGallery._id,
          });
        }

        // Sort activities by time (most recent first)
        activities.sort((a, b) => b.time - a.time);

        setRecentActivities(activities);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

  // Helper function to format relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
          Admin Access
        </span>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Projects Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg flex flex-col h-full">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-bold">Projects</h2>
            <p className="text-blue-100 mt-0.5 text-xs sm:text-sm">
              Manage construction projects
            </p>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <span className="text-gray-600 text-xs sm:text-sm">
                Total Projects
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-800">
                {stats.projects}
              </span>
            </div>
            <div className="flex flex-row space-x-2 mt-3">
              <Link
                to="/addprojects"
                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-1 text-center text-xs sm:text-sm"
              >
                Add New
              </Link>
              <Link
                to="/manage-projects"
                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex-1 text-center text-xs sm:text-sm"
              >
                Manage
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg flex flex-col h-full">
          <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <h2 className="text-lg font-bold">Gallery</h2>
            <p className="text-blue-100 mt-0.5 text-xs sm:text-sm">
              Showcase your work
            </p>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <span className="text-gray-600 text-xs sm:text-sm">
                Total Images
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-800">
                {stats.gallery}
              </span>
            </div>
            <div className="flex flex-row space-x-2 mt-3">
              <Link
                to="/addgallery"
                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-1 text-center text-xs sm:text-sm"
              >
                Add New
              </Link>
              <Link
                to="/manage-gallery"
                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex-1 text-center text-xs sm:text-sm"
              >
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    activity.type === "project" ? "bg-green-500" : "bg-indigo-500"
                  }`}
                />
                <p className="text-gray-700 text-xs sm:text-sm flex-grow mr-2 line-clamp-1">
                  {activity.message}
                </p>
                <span className="text-xs text-gray-500">
                  {getRelativeTime(activity.time)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500 text-sm">
                No recent activities found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;