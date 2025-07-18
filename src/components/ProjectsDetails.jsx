"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import CTASection from "./CTASection"
import TopSection from "./TopSection"

const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true)
      try {
        // Fetch main project
        const res = await axios.get(`${API_BASE_URL}/api/projects/${id}`)
        setProject(res.data.project)
        if (res.data.project.coverImage) {
          setActiveImage(res.data.project.coverImage)
        }

        // Fetch related projects (projects in the same category or other projects)
        const relatedRes = await axios.get(`${API_BASE_URL}/api/projects`)
        // Filter out the current project and get up to 3 related projects
        const filteredProjects = relatedRes.data.projects.filter((p) => p._id !== id).slice(0, 3)
        setRelatedProjects(filteredProjects)

        setError(null)
      } catch (err) {
        console.error("Error fetching project data:", err)
        setError("Failed to load project. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id, API_BASE_URL])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-red-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Error</h2>
          <p className="text-sm sm:text-base">{error}</p>
          <Link
            to="/projects"
            className="mt-4 inline-block px-4 py-2 sm:px-6 sm:py-2 bg-red-800 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  if (!project) return null

  return (
    <>
    <TopSection heading1={"Project Details"} heading2={project.title} />
    <div className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          {project.category && (
            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-800 text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
              {project.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-800">{project.title}</h1>
          {project.location && (
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              <span className="inline-flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
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
              </span>
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              {activeImage && (
                <img
                  src={`${API_BASE_URL}/uploads/${activeImage}`}
                  alt={project.title}
                  className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
                />
              )}
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-4 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Project Details</h2>

              <div className="space-y-3 sm:space-y-4">
                {project.description && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-sm sm:text-base text-gray-800">{project.description}</p>
                  </div>
                )}

                {project.category && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Category</h3>
                    <p className="text-sm sm:text-base text-gray-800">{project.category}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Share this project</h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="#" className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="p-1.5 sm:p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="p-1.5 sm:p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 16.084c-.75.36-1.334.201-1.83.098-.496-.103-1.422-.44-2.035-.854-.613-.412-1.13-.89-1.522-1.519-.391-.629-.391-1.057-.391-1.057l-1.548.412s-.34 1.083.316 2.166c.656 1.083.958 1.458 1.548 1.956.59.498 1.422.957 2.035 1.233.613.276 1.962.412 3.183.136 1.222-.277 2.152-.812 2.723-1.233.571-.42.883-.69 1.304-1.545.422-.855.309-1.545.309-1.545l-1.304-.232s-.552 1.522-2.788 1.984z M7.304 7.955c.65-.133 1.239-.299 1.239-.299l.104-1.031s-1.342.098-2.477.366c-1.135.268-2.18.793-2.788 1.522-.607.73-.81 1.458-.81 1.458l.959.299s.206-.629.857-1.258c.65-.629 1.187-.957 1.838-1.09l1.078-.267z M17.092 9.8c-.896-.184-1.978.141-1.978.141l.141.731s.923-.234 1.631-.05c.707.184 1.304.518 1.304.518l.4-.592s-.601-.563-1.498-.748z M14.987 7.584c-.637-.123-1.304-.087-1.304-.087l.047.693s.872-.018 1.304.123c.432.14.903.327 1.304.66.401.334.637.545.637.545l.495-.405s-.545-.59-1.146-.924c-.601-.334-.999-.482-1.337-.605z M16.758 5.557c-.654-.582-1.873-1.048-3.183-1.107-1.31-.06-2.142.364-2.142.364l.26.625s.714-.306 1.69-.306 1.83.247 2.543.653c.714.406 1.22.9 1.22.9l.453-.465s-.187-.082-.841-.664z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Other Projects */}
          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-20 sm:top-24">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">Other Projects</h2>

              {relatedProjects.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {relatedProjects.map((relatedProject) => (
                    <Link key={relatedProject._id} to={`/projects/${relatedProject._id}`} className="block group">
                      <div className="flex flex-col space-y-2 sm:space-y-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="h-32 sm:h-40 overflow-hidden rounded-lg">
                          {relatedProject.coverImage ? (
                            <img
                              src={`${API_BASE_URL}/uploads/${relatedProject.coverImage}`}
                              alt={relatedProject.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
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
                          <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-red-800 transition-colors">
                            {relatedProject.title}
                          </h3>
                          {relatedProject.category && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full inline-block mt-1">
                              {relatedProject.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-500 text-center py-4">No other projects available</p>
              )}

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <Link to="/projects" className="inline-flex items-center text-red-800 text-sm sm:text-base font-medium hover:underline">
                  View All Projects
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-64">
                  <img
                    src={`${API_BASE_URL}/uploads/${img}`}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 sm:p-4 w-full">
                      <p className="text-white text-xs sm:text-sm">
                        {project.title} - Image {idx + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <CTASection/>
    </>
  )
}

export default ProjectDetails
