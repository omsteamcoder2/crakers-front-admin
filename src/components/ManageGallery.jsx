"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import NoContent from "./NoContent"
import { Pencil, X } from "lucide-react"

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/galleries`)
      setGalleries(response.data.galleries || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching galleries:", error)
      setError("Failed to load gallery images. Please try again.")
      setGalleries([])
    } finally {
      setIsLoading(false)
    }
  }

  const deleteGallery = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return

    try {
      await axios.delete(`${API_BASE_URL}/api/galleries/${id}`)
      setGalleries(galleries.filter((gallery) => gallery._id !== id))
    } catch (error) {
      console.error("Error deleting gallery:", error)
      alert("Failed to delete gallery item. Please try again.")
    }
  }

  const editGallery = (id) => {
    navigate(`/edit-gallery/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Manage Gallery</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Total: {galleries.length} gallery items
          </p>
        </div>
        <Link
          to="/addgallery"
          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap"
        >
          <span className="mr-1">+</span> Add New Images
        </Link>
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

      {galleries.length === 0 && !error ? (
        <NoContent type={"gallery"} message="No gallery images found." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="h-32 sm:h-40 bg-gray-200 dark:bg-gray-700 relative group">
                {gallery.images && gallery.images[0] ? (
                  <img
                    src={`${API_BASE_URL}${gallery.images[0]}`}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-0.5 rounded-full text-xs">
                  {gallery.images?.length || 0} images
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {gallery.title || `Gallery Item ${gallery._id.substring(0, 6)}`}
                </h3>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => editGallery(gallery._id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    aria-label="Edit gallery"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteGallery(gallery._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Delete gallery"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageGallery