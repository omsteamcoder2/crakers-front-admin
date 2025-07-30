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
          name: "Projects",
          path: "/manage-projects",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
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
          name: "Add Project",
          path: "/addprojects",
          icon: "M12 4v16m8-8H4",
        },
        {
          name: "Add Gallery",
          path: "/addgallery",
          icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
        },
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
      className="w-64 h-screen fixed md:sticky top-0 bg-zinc-800 text-zinc-100 shadow-xl flex flex-col border-r border-zinc-800 z-50"
    >
      {/* Header */}
      <div className="p-5 border-b border-zinc-700 flex items-center gap-3 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-zinc-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <img
          src="/assets/images/profile.png"
          alt="Admin"
          className="w-11 h-11 rounded-full border-2 border-amber-500 object-cover"
        />
        <div>
          <p className="text-base font-semibold">Admin User</p>
          <p className="text-xs text-zinc-400">Administrator</p>
        </div>
      </div>

      {/* Nav Sections */}
      <div className="flex-1 py-5 overflow-y-auto">
        <div className="px-4 mb-5">
          <a
            href={import.meta.env.VITE_COMPANY_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-zinc-300 hover:text-white px-3 py-2 rounded-md transition"
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
            <h4 className="px-6 text-xs text-zinc-100 uppercase font-medium tracking-wide mb-2">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-2.5 text-sm font-medium rounded-md transition ${
                      isActive(item.path)
                        ? "bg-amber-600/20 text-amber-200 border-l-4 border-amber-500"
                        : "text-zinc-200 hover:bg-zinc-800 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <svg
                      className="w-5 h-5 mr-3"
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
      <div className="p-5 border-t border-zinc-700 mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center w-full text-sm text-red-400 hover:bg-zinc-700 px-3 py-2 rounded-md transition"
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
        <div className="mt-4 text-xs text-center text-zinc-300">
          <p>{import.meta.env.VITE_COMPANY_NAME || "Thiru Gas"} Admin</p>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
