"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import CTASection from "../components/CTASection"
import TopSection from "../components/TopSection"
import { motion } from "framer-motion"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [featuredProject, setFeaturedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [categories, setCategories] = useState(["All"])
  const projectsRef = useRef(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects`)
      const projectsData = response.data.projects || []
      setProjects(projectsData)

      // Extract unique categories
      const uniqueCategories = ["All", ...new Set(projectsData.map((project) => project.category).filter(Boolean))]
      setCategories(uniqueCategories)

      // Set the featured project (first project or most recent)
      if (projectsData.length > 0) {
        // You could also fetch a specific featured project from an endpoint if available
        setFeaturedProject(projectsData[0])
      }

      setError(null)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setError("Failed to load projects. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const handleFilterClick = (category) => {
    setActiveFilter(category)
    // Scroll to projects section with smooth animation
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

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
      <TopSection
        heading1={"Our Projects"}
        heading2="Explore our portfolio of successful construction and design projects"
      />

      {/* Category Filter */}
      <section className="py-4 sm:py-6 md:py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterClick(category)}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-red-800 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-48 sm:h-64">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-red-900"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:p-6 rounded-lg text-sm sm:text-base">
                <h3 className="text-base sm:text-lg font-medium mb-2">Error</h3>
                <p>{error}</p>
                <button
                  onClick={fetchProjects}
                  className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-800 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-10 sm:py-16">
                <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No projects found</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                  No projects available in this category at the moment.
                </p>
                {activeFilter !== "All" && (
                  <button
                    onClick={() => setActiveFilter("All")}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 text-sm bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    View All Projects
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project._id} variants={item}>
                    <Link
                      to={`/projects/${project._id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block transform hover:-translate-y-1"
                    >
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        {project.coverImage ? (
                          <img
                            src={`${API_BASE_URL}/uploads/${project.coverImage}`}
                            alt={project.title}
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
                        {project.category && (
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-800 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                            {project.category}
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 md:p-6">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-red-800 transition-colors">
                          {project.title}
                        </h3>
                        {project.location && (
                          <div className="flex items-center text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {project.location}
                          </div>
                        )}
                        {project.description && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-red-800 text-xs sm:text-sm font-medium flex items-center">
                            View Details
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

      {/* Featured Project Section */}
      {!isLoading && !error && featuredProject && (
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Featured Project</h2>
                <div className="w-16 sm:w-24 h-1 bg-red-800 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                  Take a closer look at one of our most impressive construction projects, showcasing our expertise and
                  attention to detail.
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
                  {featuredProject.coverImage ? (
                    <img
                      src={`${API_BASE_URL}/uploads/${featuredProject.coverImage}`}
                      alt={featuredProject.title}
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
                  {featuredProject.category && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md sm:shadow-lg">
                      {featuredProject.category}
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{featuredProject.title}</h3>
                  {featuredProject.description && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                      {featuredProject.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                    {featuredProject.location && (
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">
                          <span className="font-medium text-gray-700 block mb-1 text-xs sm:text-sm">Location</span>
                          {featuredProject.location}
                        </p>
                      </div>
                    )}
                    {featuredProject.category && (
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">
                          <span className="font-medium text-gray-700 block mb-1 text-xs sm:text-sm">Category</span>
                          {featuredProject.category}
                        </p>
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/projects/${featuredProject._id}`}
                    className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-red-800 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
                  >
                    View Project Details
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Contact us today to discuss your construction needs and get a free consultation."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  )
}

export default Projects
