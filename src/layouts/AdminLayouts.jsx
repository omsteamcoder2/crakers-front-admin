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
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block">
  <Sidebar onLogout={() => setShowLogoutConfirm(true)} />
</div>

      {/* Mobile Sidebar Drawer */}
      {isMobile && isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-zinc-900/30 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <Sidebar
            onClose={() => setIsDrawerOpen(false)}
            onLogout={() => setShowLogoutConfirm(true)}
          />
        </>
      )}
      <div className="flex-1 flex flex-col">
        <header className="bg-zinc-800 border-b border-zinc-500 py-3 px-4 md:px-8 sticky top-0 z-30">
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
            <h1 className="text-xl font-bold text-gray-100">
              {import.meta.env.VITE_COMPANY_NAME || "Admin Panel"}
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center"
              >
                AU
              </button>
              {isProfileOpen && (
                <div
                  ref={modalRef}
                  className="absolute right-0 mt-2 w-40 bg-zinc-800 rounded shadow-md z-50 border border-zinc-700"
                >
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-2 md:p-6 overflow-auto">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-md w-80 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-zinc-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm rounded bg-zinc-600 hover:bg-zinc-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
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
