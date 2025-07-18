"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import PageHeaderWaveDivider from "./PageHeaderWaveDivider"
import CTASection from "./CTASection"

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true)
      try {
        // Fetch main blog
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${id}`)
        setBlog(res.data.blog)

        // Fetch related blogs (blogs in the same category or other blogs)
        const relatedRes = await axios.get(`${API_BASE_URL}/api/blogs`)
        // Filter out the current blog and get up to 3 related blogs
        const filteredBlogs = relatedRes.data.blogs.filter((b) => b._id !== id).slice(0, 3)
        setRelatedBlogs(filteredBlogs)

        setError(null)
      } catch (err) {
        console.error("Error fetching blog data:", err)
        setError("Failed to load blog. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogData()
  }, [id, API_BASE_URL])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <Link
            to="/blog"
            className="mt-4 inline-block px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  if (!blog) return null

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gray-900 to-red-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <span className="px-3 py-1 bg-red-700 text-sm rounded-full">{blog.category || "General"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{blog.title}</h1>
            <div className="flex items-center justify-center text-sm text-gray-300 space-x-4">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <PageHeaderWaveDivider color="#ffffff" height={80} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content - Left Column */}
          <div className="lg:col-span-2">
            {blog.images && blog.images.length > 0 && (
              <div className="mb-10 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={`${API_BASE_URL}/uploads/${blog.images[0]}`}
                  alt={blog.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {blog.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Written by {blog.author}</h3>
                    <p className="text-gray-600">Construction Specialist</p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 16.084c-.75.36-1.334.201-1.83.098-.496-.103-1.422-.44-2.035-.854-.613-.412-1.13-.89-1.522-1.519-.391-.629-.391-1.057-.391-1.057l-1.548.412s-.34 1.083.316 2.166c.656 1.083.958 1.458 1.548 1.956.59.498 1.422.957 2.035 1.233.613.276 1.962.412 3.183.136 1.222-.277 2.152-.812 2.723-1.233.571-.42.883-.69 1.304-1.545.422-.855.309-1.545.309-1.545l-1.304-.232s-.552 1.522-2.788 1.984z M7.304 7.955c.65-.133 1.239-.299 1.239-.299l.104-1.031s-1.342.098-2.477.366c-1.135.268-2.18.793-2.788 1.522-.607.73-.81 1.458-.81 1.458l.959.299s.206-.629.857-1.258c.65-.629 1.187-.957 1.838-1.09l1.078-.267z M17.092 9.8c-.896-.184-1.978.141-1.978.141l.141.731s.923-.234 1.631-.05c.707.184 1.304.518 1.304.518l.4-.592s-.601-.563-1.498-.748z M14.987 7.584c-.637-.123-1.304-.087-1.304-.087l.047.693s.872-.018 1.304.123c.432.14.903.327 1.304.66.401.334.637.545.637.545l.495-.405s-.545-.59-1.146-.924c-.601-.334-.999-.482-1.337-.605z M16.758 5.557c-.654-.582-1.873-1.048-3.183-1.107-1.31-.06-2.142.364-2.142.364l.26.625s.714-.306 1.69-.306 1.83.247 2.543.653c.714.406 1.22.9 1.22.9l.453-.465s-.187-.082-.841-.664z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            {blog.images && blog.images.length > 1 && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blog.images.map((img, index) => (
                    <div key={index} className="group relative rounded-lg overflow-hidden h-48">
                      <img
                        src={`${API_BASE_URL}/uploads/${img}`}
                        alt={`Blog Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white text-sm">Image {index + 1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Other Blogs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Other Articles</h2>

              {relatedBlogs.length > 0 ? (
                <div className="space-y-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link key={relatedBlog._id} to={`/blog/${relatedBlog._id}`} className="block group">
                      <div className="flex flex-col space-y-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="h-40 overflow-hidden rounded-lg">
                          {relatedBlog.images && relatedBlog.images.length > 0 ? (
                            <img
                              src={`${API_BASE_URL}/uploads/${relatedBlog.images[0]}`}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-gray-400"
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
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-red-800 transition-colors line-clamp-2">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">By {relatedBlog.author}</p>
                          {relatedBlog.category && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block mt-1">
                              {relatedBlog.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No other articles available</p>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link to="/blog" className="inline-flex items-center text-red-800 font-medium hover:underline">
                  View All Articles
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Categories Section */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/blog"
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200"
                  >
                    All
                  </Link>
                  {blog.category && (
                    <Link
                      to="/blog"
                      className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full hover:bg-red-200"
                    >
                      {blog.category}
                    </Link>
                  )}
                  <Link
                    to="/blog"
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200"
                  >
                    Construction
                  </Link>
                  <Link
                    to="/blog"
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200"
                  >
                    Design
                  </Link>
                  <Link
                    to="/blog"
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200"
                  >
                    Tips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  )
}

export default BlogDetails
