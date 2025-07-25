"use client"

import { motion } from "framer-motion"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    {
      title: "Content Management",
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
        {
          name: "Blogs",
          path: "/manage-blogs",
          icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
        },
        {
          name: "Services",
          path: "/manage-services",
          icon: "M3 7h18M3 12h18M3 17h18", // menu/hamburger icon
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
        {
          name: "Add Blog",
          path: "/addblogs",
          icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
        },
        {
          name: "Add Service",
          path: "/addservices",
          icon: "M12 4v16m8-8H4", // same "plus" icon as Add Project
        },
      ],
    },
  ]


  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col h-screen sticky top-0 overflow-y-auto border-r border-blue-800/30"
    >
      {/* Profile Section */}
      <div className="p-4 flex items-center space-x-3 border-b border-blue-800/30">
        <img
          src="/public/assets/images/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
        />
        <div>
          <h2 className="font-medium">Admin User</h2>
          <p className="text-xs text-blue-300">Administrator</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        <div className="px-2 mb-4">
          <a
            href="http://localhost:3000/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/20 hover:text-white rounded-md transition-colors"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
        {navItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-6 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-2.5 text-sm transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-800/40 text-white border-l-4 border-blue-500"
                        : "text-blue-100 hover:bg-blue-800/20 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
      <div className="p-4 border-t border-blue-800/30 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-blue-100 hover:bg-blue-800/30 rounded-md transition-colors"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
        <div className="mt-4 text-xs text-center text-blue-300">
          <p>{import.meta.env.VITE_COMPANY_NAME} Admin</p>
          <p className="mt-1">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar