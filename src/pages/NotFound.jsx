import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-red-800">404</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">Page Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-800 hover:bg-red-900 text-white text-sm sm:text-base font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          Go Back Home
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
