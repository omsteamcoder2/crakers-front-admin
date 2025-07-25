"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white p-3 sm:p-4">
      {/* Mobile menu button */}
      <div className="flex justify-between items-center md:hidden px-2">
        <Link to="/" className="text-xl font-bold">
          {import.meta.env.VITE_COMPANY_NAME}
        </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none" aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-2`}>
        <ul className="flex flex-col space-y-2 px-2">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex justify-center gap-6 text-base lg:text-lg">
        <li>
          <Link to="/" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-gray-400 transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:text-gray-400 transition">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
