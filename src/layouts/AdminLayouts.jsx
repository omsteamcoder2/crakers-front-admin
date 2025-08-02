"use client";

import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block">
        <Sidebar onLogout={() => setShowLogoutConfirm(true)} />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobile && isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-red-900/30 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <Sidebar
            onClose={() => setIsDrawerOpen(false)}
            onLogout={() => setShowLogoutConfirm(true)}
          />
        </>
      )}
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-red-800 to-red-700 border-b border-red-600 py-3 px-4 md:px-8 sticky top-0 z-30 shadow-md">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-white focus:outline-none md:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">
              {import.meta.env.VITE_COMPANY_NAME || "Fireworks Admin"}
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full bg-amber-500 text-red-900 font-bold flex items-center justify-center hover:bg-amber-400 transition-colors"
              >
                AU
              </button>
              {isProfileOpen && (
                <div
                  ref={modalRef}
                  className="absolute right-0 mt-2 w-40 bg-red-800 rounded-md shadow-lg z-50 border border-red-700"
                >
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-amber-300 hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-2 md:p-6">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-red-800 border border-red-700 p-6 rounded-md w-80 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-red-100 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm rounded bg-red-700 hover:bg-red-600 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm rounded bg-amber-500 hover:bg-amber-600 text-red-900 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;