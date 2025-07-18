"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import NoContent from "./NoContent"
import { Pencil, X } from "lucide-react"

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs`)
      setBlogs(response.data.blogs || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      setError("Failed to load blogs. Please try again.")
      setBlogs([])
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return

    try {
      await axios.delete(`${API_BASE_URL}/api/blogs/${id}`)
      setBlogs(blogs.filter((blog) => blog.slug !== id))
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("Failed to delete blog post. Please try again.")
    }
  }

  const editBlog = (id) => {
    navigate(`/edit-blog/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-900 dark:border-red-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Manage Blogs</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total: {blogs.length} blog posts</p>
        </div>
        <Link
          to="/addblogs"
          className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors flex items-center whitespace-nowrap dark:bg-red-700 dark:hover:bg-red-800"
        >
          <span className="mr-1">+</span> Add New Blog
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded text-xs mb-3 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200">
          <p>{error}</p>
        </div>
      )}

      {blogs.length === 0 && !error ? (
        <NoContent type={"blogs"} message="No blog posts found. Add your first blog post!" />
      ) : (
        <>
          {/* Mobile view: card layout */}
          <div className="block sm:hidden space-y-3">
            {blogs.map((blog) => (
              <div key={blog.slug} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      {blog.images && blog.images.length > 0 ? (
                        <img
                          src={`${API_BASE_URL}${blog.images[0]}`}
                          alt={blog.title}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{blog.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {blog.content?.substring(0, 40)}...
                      </div>
                    </div>
                  </div>

                  {/* Category and Buttons in a Single Line */}
                  <div className="flex justify-between items-center mt-2">
                    {blog.category ? (
                      <span className="px-2 py-0.5 inline-flex text-[10px] leading-5 font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {blog.category}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 inline-flex text-[10px] leading-5 font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Uncategorized
                      </span>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editBlog(blog.slug)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.slug)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view: table layout with dark theme */}
          <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden overflow-x-auto dark:bg-gray-800 dark:border dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Blog Post
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell dark:text-gray-300"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell dark:text-gray-300"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {blogs.map((blog) => (
                  <tr key={blog.slug} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 mr-3">
                          {blog.images && blog.images.length > 0 ? (
                            <img
                              src={`${API_BASE_URL}${blog.images[0]}`}
                              alt={blog.title}
                              className="h-8 w-8 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{blog.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[150px] sm:max-w-xs">
                            {blog.content?.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                      {blog.category ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          {blog.category}
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Uncategorized
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 hidden md:table-cell dark:text-gray-400">
                      {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => editBlog(blog.slug)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.slug)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default ManageBlogs