import { Link } from "react-router-dom"


const NoContent = ({ type, addLink, message, icon }) => {
  // Default messages based on content type
  const defaultMessages = {
    blogs: "No blog posts found. Add your first blog post!",
    projects: "No projects found. Add your first project!",
    gallery: "No gallery images found. Add your first gallery!",
    default: "No content found. Add your first item!",
  }

  // Default icons based on content type
  const getIcon = () => {
    if (icon) return icon

    switch (type) {
      case "blogs":
        return (
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        )
      case "projects":
        return (
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        )
      case "gallery":
        return (
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )
      default:
        return (
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  // Get button text based on content type
  const getButtonText = () => {
    switch (type) {
      case "blogs":
        return "Add New Blog"
      case "projects":
        return "Add New Project"
      case "gallery":
        return "Add New Gallery"
      default:
        return "Add New Item"
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
      <div className="flex flex-col items-center justify-center">
        {getIcon()}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{type ? `No ${type} found` : "No content found"}</h3>
        <p className="text-gray-500 mb-6">{message || defaultMessages[type] || defaultMessages.default}</p>

        {addLink && (
          <Link
            to={addLink}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <span className="mr-2">+</span> {getButtonText()}
          </Link>
        )}
      </div>
    </div>
  )
}

export default NoContent
