"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NoContent from "./NoContent";
import { Eye, Pencil, X } from "lucide-react";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(response.data.projects || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setConfirmModalOpen(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/projects/${projectToDelete.slug}`
      );
      setProjects(projects.filter((p) => p.slug !== projectToDelete.slug));
      setConfirmModalOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const editProject = (slug) => {
    navigate(`/edit-project/${slug}`);
  };

  const viewProject = (project) => {
    setSelectedProject(project);
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full p-2 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage Projects
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Total: {projects.length} projects
          </p>
        </div>
        <Link
          to="/addprojects"
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
        >
          <span className="mr-1 font-bold">+</span> Add New Project
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 rounded-lg text-sm sm:text-base flex items-center">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {projects.length === 0 && !error ? (
        <NoContent
          type={"projects"}
          message="No projects found. Add your first project!"
        />
      ) : (
        <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Mobile view: Cards */}
          <div className="block sm:hidden">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="w-full border-b border-gray-200 p-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 h-14 w-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  {project.coverImage ? (
                    <img
                      src={`${API_BASE_URL}${project.coverImage}`}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {project.description || "No description"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      project.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-start items-center space-y-1 ml-1">
                  <button
                    onClick={() => viewProject(project)}
                    className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="View project"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editProject(project.slug)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="Edit project"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(project)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Delete project"
                    title="Delete"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table remains unchanged — use your current one */}
          <div className="hidden sm:block overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr
                    key={project.slug}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          {project.coverImage ? (
                            <img
                              src={`${API_BASE_URL}${project.coverImage}`}
                              alt={project.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50">
                              <svg
                                className="h-5 w-5 sm:h-6 sm:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-3 sm:ml-4 min-w-0">
                          <div className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                            {project.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 truncate">
                            {project.description?.substring(0, 70) ||
                              "No description"}
                            ...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                      {new Date(
                        project.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm sm:text-base font-medium">
                      <div className="flex justify-end space-x-2 sm:space-x-4">
                        <button
                          onClick={() => viewProject(project)}
                          className="text-gray-600 hover:text-gray-800 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label="View project"
                          title="View"
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => editProject(project.slug)}
                          className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          aria-label="Edit project"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project)}
                          className="text-red-600 hover:text-red-800 p-1 sm:p-2 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Delete project"
                          title="Delete"
                        >
                          <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 border-b border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Project Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {selectedProject.coverImage && (
                  <div className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm">
                    <img
                      src={`${API_BASE_URL}${selectedProject.coverImage}`}
                      alt={selectedProject.title}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Title
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {selectedProject.title}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Slug
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {selectedProject.slug}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Category
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {selectedProject.category || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Location
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {selectedProject.location || "N/A"}
                    </p>
                  </div>

                  <div className="md:col-span-2 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Excerpt
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base">
                      {selectedProject.excerpt}
                    </p>
                  </div>

                  <div className="md:col-span-2 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Description
                    </h3>
                    <p className="text-gray-800 text-sm sm:text-base whitespace-pre-line">
                      {selectedProject.description || "No description"}
                    </p>
                  </div>
                </div>

                {selectedProject.gallery &&
                  selectedProject.gallery.length > 0 && (
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
                      <h3 className="font-semibold text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {selectedProject.gallery.map((image, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                          >
                            <img
                              src={`${API_BASE_URL}${image}`}
                              alt={`Gallery item ${index + 1}`}
                              className="w-full h-24 sm:h-32 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    SEO Metadata
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Meta Title
                      </h3>
                      <p className="text-gray-800 text-sm sm:text-base">
                        {selectedProject.metaTitle || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Meta Description
                      </h3>
                      <p className="text-gray-800 text-sm sm:text-base">
                        {selectedProject.metaDescription || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                        OG Title
                      </h3>
                      <p className="text-gray-800 text-sm sm:text-base">
                        {selectedProject.ogTitle || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                        OG Description
                      </h3>
                      <p className="text-gray-800 text-sm sm:text-base">
                        {selectedProject.ogDescription || "N/A"}
                      </p>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Keywords
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedProject.keywords &&
                        selectedProject.keywords.length > 0 ? (
                          selectedProject.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white text-gray-700 text-xs sm:text-sm rounded border border-gray-200 shadow-sm"
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm sm:text-base">
                            No keywords
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-800 text-white text-sm sm:text-base rounded-lg hover:bg-gray-700 transition-colors shadow hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Are you sure you want to delete{" "}
              <strong>{projectToDelete.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3 sm:space-x-4">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setProjectToDelete(null);
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-200 text-gray-700 text-sm sm:text-base hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 text-white text-sm sm:text-base hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
