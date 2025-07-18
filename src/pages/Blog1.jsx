"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"
import { motion } from "framer-motion"

const Blog1 = () => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [featuredBlog, setFeaturedBlog] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const blogListRef = useRef(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`)
        const blogsData = res.data.blogs || []

        // Set blogs
        setBlogs(blogsData)

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(blogsData.map((blog) => blog.category || "General"))]
        setCategories(uniqueCategories)

        // Set featured blog (most recent)
        if (blogsData.length > 0) {
          setFeaturedBlog(blogsData[0])
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError("Failed to load blogs. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [API_BASE_URL])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    // Scroll to blog list with smooth animation
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Filter blogs by selected category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <TopSection heading1="Our Blog" heading2="Insights, News & Construction Tips" />

      {/* Featured Blog Section */}
      {featuredBlog && !isLoading && !error && (
        <section className="py-10 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Featured Article</h2>
                <div className="w-16 sm:w-24 h-1 bg-red-800 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                  Stay updated with our latest insights and news from the construction industry
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <motion.div
                  className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg sm:shadow-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {featuredBlog.images && featuredBlog.images.length > 0 ? (
                    <img
                      src={`${API_BASE_URL}/uploads/${featuredBlog.images[0]}`}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 sm:w-16 sm:h-16 text-gray-400"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  {featuredBlog.category && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md sm:shadow-lg">
                      {featuredBlog.category}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-3 sm:space-y-4 md:space-y-6 px-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{featuredBlog.title}</h3>
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-red-800 text-white flex items-center justify-center mr-2">
                      <span>{featuredBlog.author.charAt(0).toUpperCase()}</span>
                    </div>
                    By <span className="font-medium ml-1">{featuredBlog.author}</span>
                  </div>
                  {featuredBlog.content && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 line-clamp-3 leading-relaxed">
                      {featuredBlog.content.substring(0, 250)}...
                    </p>
                  )}
                  <Link
                    to={`/blog/${featuredBlog._id}`}
                    className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-red-800 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
                  >
                    Read Full Article
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Listing Section */}
      <section ref={blogListRef} className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Latest Articles</h2>

              {/* Search Bar */}
              <div className="w-full md:w-auto mb-4 md:mb-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-64 px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-red-800 text-white shadow-md"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-48 sm:h-64">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-red-900"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:p-6 rounded-lg text-sm sm:text-base">
                <h3 className="text-base sm:text-lg font-medium mb-2">Error</h3>
                <p>{error}</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-10 sm:py-16 bg-white rounded-xl shadow-sm">
                <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-medium text-gray-700 mt-4 mb-2">No articles found</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6">No articles match your current filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchQuery("")
                  }}
                  className="px-4 sm:px-5 py-1.5 sm:py-2 text-sm bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredBlogs.map((blog) => (
                  <motion.div key={blog._id} variants={item}>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block transform hover:-translate-y-1 h-full flex flex-col border border-gray-100"
                    >
                      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                        {blog.images && blog.images.length > 0 ? (
                          <img
                            src={`${API_BASE_URL}/uploads/${blog.images[0]}`}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {blog.category && (
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-800 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                            {blog.category}
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex items-center">
                          <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 text-gray-600 items-center justify-center mr-1 sm:mr-2 text-xs">
                            {blog.author.charAt(0).toUpperCase()}
                          </span>
                          {blog.author}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-grow">{blog.content}</p>
                        <div className="flex justify-end mt-auto">
                          <span className="text-red-800 text-xs sm:text-sm font-medium flex items-center">
                            Read More
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

export default Blog1
