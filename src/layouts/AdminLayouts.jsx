"use client"

import { useState, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Close drawer when window resizes
    window.addEventListener("resize", () => setIsDrawerOpen(false))

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
      window.removeEventListener("resize", () => setIsDrawerOpen(false))
    }
  }, [])

  // Navigation items - these should match what's in your Sidebar component
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "home" },
    { path: "/manage-projects", label: "Projects", icon: "briefcase" },
    { path: "/manage-blogs", label: "Blogs", icon: "file-text" },
    { path: "/manage-gallery", label: "Gallery", icon: "image" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  // Close drawer when location changes (i.e., when navigating to a new page)
  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer - shown only when open */}
      {isMobile && (
        <div className={`fixed inset-0 z-50 ${isDrawerOpen ? "block" : "hidden"}`}>
          {/* Semi-transparent backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Drawer panel - only taking up part of the screen */}
          <div
            className={`absolute top-0 left-0 h-full w-[85%] max-w-[280px] bg-gradient-to-b from-blue-900 to-blue-950 transform transition-transform duration-200 ease-in-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Close button - inside drawer */}
            <button
              className="absolute top-3 right-3 text-blue-300 hover:text-white p-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Drawer header */}
            <div className="flex-shrink-0 flex items-center px-4 mt-6">
              <h2 className="text-white text-lg font-bold">RF Constructions</h2>
            </div>

            {/* Drawer navigation - with flex-1 to push profile to bottom */}
            <nav className="mt-8 flex-1 px-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-2 py-2.5 text-sm font-medium rounded-md ${
                      isActive ? "bg-blue-800/40 text-white border-l-4 border-blue-500" : "text-blue-100 hover:bg-blue-800/20 hover:text-white"
                    }`}
                  >
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon === "home" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      )}
                      {item.icon === "briefcase" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      )}
                      {item.icon === "file-text" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      )}
                      {item.icon === "image" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      )}
                    </svg>
                    {item.label}
                  </Link>
                )
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-blue-100 hover:bg-blue-800/20 hover:text-white"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </nav>

            {/* Profile Section - now at the very bottom of the drawer */}
            <div className="flex-shrink-0 border-t border-blue-800/30 p-4 mt-auto">
              <div className="flex items-center">
                <div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <span className="font-medium text-sm">RF</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs font-medium text-blue-300">admin@rfconstructions.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - Now with a gradient background and menu button */}
        <header className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-md py-3 px-3 md:px-8 border-b border-blue-700/30 sticky top-0 z-[1000]">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Menu button for mobile */}
              {isMobile && (
                <button 
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
                  className="text-white focus:outline-none p-1.5 rounded-md hover:bg-blue-700/30"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-lg md:text-2xl font-bold text-white ml-2 md:ml-0">RF Constructions</h1>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <Link to="/dashboard" className="hidden md:inline-block text-blue-200 hover:text-white transition-colors">
                Dashboard
              </Link>

              {/* Logout for desktop */}
              <button
                onClick={handleLogout}
                className="hidden md:inline-block text-blue-200 hover:text-white transition-colors"
              >
                Logout
              </button>
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <span className="font-medium text-sm">RF</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-8 overflow-auto pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Navigation Bar - with a blue gradient background */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-900 border-t border-blue-700/30 shadow-lg z-10">
            <div className="flex justify-around items-center h-14">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center px-1 py-1 ${
                      isActive ? "text-white" : "text-blue-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon === "home" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      )}
                      {item.icon === "briefcase" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      )}
                      {item.icon === "file-text" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      )}
                      {item.icon === "image" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      )}
                    </svg>
                    <span className="text-[10px] mt-0.5">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}

export default AdminLayout