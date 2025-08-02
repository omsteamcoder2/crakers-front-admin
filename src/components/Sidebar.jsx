"use client"

import { motion } from "framer-motion"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Sidebar = ({ onClose, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    {
      title: "Manage Content",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          name: "Products",
          path: "/manage-products",
          icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
        },
        {
          name: "Gallery",
          path: "/manage-gallery",
          icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
        },
      ],
    },
    {
      title: "Create New",
      items: [
        {
          name: "Add Product",
          path: "/add-product",
          icon: "M12 4v16m8-8H4",
        },
        {
          name: "Add Gallery",
          path: "/addgallery",
          icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
        },
        {
          name: "Category",
          path: "/manage-category",
          icon: "M12 4v16m8-8H4",
        },
        {
  name: "Popup Ad",
  path: "/manage-popupad",
  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11.83a2.032 2.032 0 01.595-1.437L20 9h-5V5a3 3 0 00-3-3H6a3 3 0 00-3 3v14a3 3 0 003 3h6a3 3 0 003-3v-4z",
}

      ],
    },
    {
      title: "Google Tag",
      items: [
        {
          name: "Manage Gtm Tag",
          path: "/manage-gmt",
          icon: "M4 6h16M4 12h16M4 18h16",
        },
        {
          name: "Add Gtm Tag",
          path: "/addgtmtag",
          icon: "M12 4v16m8-8H4",
        },
      ],
    },
  ]

  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-64 h-screen fixed md:sticky top-0 bg-gradient-to-b from-red-900 to-red-800 text-red-50 shadow-xl flex flex-col border-r border-red-700 z-50"
    >
      {/* Header */}
      <div className="p-5 border-b border-red-700 flex items-center gap-3 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-red-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className="w-11 h-11 rounded-full border-2 border-amber-500 bg-red-900 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-amber-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-base font-semibold text-white">Admin User</p>
          <p className="text-xs text-red-300">Administrator</p>
        </div>
      </div>
          
      {/* Nav Sections */}
      <div className="flex-1 py-5 overflow-y-auto">
        <div className="px-4 mb-5">
          <a
            href={import.meta.env.VITE_COMPANY_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-red-200 hover:text-white px-3 py-2 rounded-md transition hover:bg-red-700/50"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Website
          </a>
        </div>

        {navItems.map((group, index) => (
          <div key={index} className="mb-6">
            <h4 className="px-6 text-xs text-amber-300 uppercase font-medium tracking-wide mb-2">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-2.5 text-sm font-medium rounded-md transition ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-amber-600/80 to-amber-500/80 text-white shadow-md"
                        : "text-red-100 hover:bg-red-700/50 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <svg
                      className={`w-5 h-5 mr-3 ${isActive(item.path) ? "text-white" : "text-amber-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={item.icon}
                      />
                    </svg>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-red-700 mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center w-full text-sm text-amber-300 hover:bg-red-700/50 px-3 py-2 rounded-md transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
        <div className="mt-4 text-xs text-center text-red-300">
          <p className="font-medium">{import.meta.env.VITE_COMPANY_NAME || "Fire Crackers"} Admin</p>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar