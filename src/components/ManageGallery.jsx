"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NoContent from "./NoContent";
import { Pencil, X, Image as ImageIcon, Plus, Eye, Trash2 } from "lucide-react";

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingGallery, setViewingGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/galleries`);
      setGalleries(response.data.galleries || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setError("Failed to load gallery items. Please try again later.");
      setGalleries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGallery = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE_URL}/api/galleries/${id}`);
      setGalleries(galleries.filter((gallery) => gallery._id !== id));
      if (viewingGallery && viewingGallery._id === id) {
        setViewingGallery(null);
      }
    } catch (error) {
      console.error("Error deleting gallery:", error);
      setError("Failed to delete gallery item. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const editGallery = (id) => {
    navigate(`/edit-gallery/${id}`);
  };

  const openGalleryView = (gallery) => {
    setViewingGallery(gallery);
    setCurrentImageIndex(0);
  };

  const closeGalleryView = () => {
    setViewingGallery(null);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % viewingGallery.images.length
    );
  };
const getFilename = (fullPath) => {
  return fullPath?.split("/").pop();
};

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? viewingGallery.images.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-full mx-auto py-4 sm:py-6 px-2 md:px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="flex justify-between mt-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto py-4 sm:py-6 px-2 md:px-4">
      {/* Gallery View Modal */}
      {viewingGallery && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 truncate max-w-[70%]">
                {viewingGallery.title || "Gallery View"}
              </h2>
              <button
                onClick={closeGalleryView}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="relative">
                {viewingGallery.images?.length > 0 ? (
                  <>
                    <div className="h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                      <img
  src={`${API_BASE_URL}/uploads/gallery/${getFilename(viewingGallery.images[currentImageIndex])}`}
  className="max-h-full max-w-full object-contain"
/>

                    </div>

                    {viewingGallery.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {viewingGallery.images.length}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mb-4" />
                    <p>No images available</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Category
                    </h3>
                    <p className="text-gray-800">
                      {viewingGallery.category || "-"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Created
                    </h3>
                    <p className="text-gray-800">
                      {new Date(viewingGallery.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total: <span className="font-medium">{galleries.length}</span>{" "}
            gallery items
          </p>
        </div>
        <Link
          to="/addgallery"
          className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm rounded-lg hover:from-red-700 hover:to-orange-600 transition-colors flex items-center whitespace-nowrap shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add New Images
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-lg flex items-center shadow-sm">
          <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
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

      {galleries.length === 0 && !error ? (
        <NoContent type={"gallery"} message="No gallery items found." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group relative"
            >
              <div
                className="h-48 relative bg-gray-50 cursor-pointer overflow-hidden"
                onClick={() => openGalleryView(gallery)}
              >
                {gallery.images && gallery.images[0] ? (
                  <img
  src={`${API_BASE_URL}/uploads/gallery/${getFilename(gallery.images[0])}`}
  alt={typeof gallery.title === "object" ? gallery.title?.name : gallery.title || "Gallery image"}
  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
/>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">No images</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full shadow-sm">
                  {gallery.images?.length || 0} images
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <h3 className="text-white font-medium truncate">
  {typeof gallery.title === "object"
    ? gallery.title?.name || `Gallery ${gallery._id.substring(0, 6)}`
    : gallery.title || `Gallery ${gallery._id.substring(0, 6)}`}
</h3>

                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {gallery.category || "Uncategorized"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGalleryView(gallery);
                      }}
                      className="text-gray-600 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="View gallery"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editGallery(gallery._id);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                      aria-label="Edit gallery"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryToDelete(gallery);
                        setConfirmModalOpen(true);
                      }}
                      disabled={deletingId === gallery._id}
                      className={`text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50 transition-colors ${
                        deletingId === gallery._id ? "opacity-50 cursor-wait" : ""
                      }`}
                      aria-label="Delete gallery"
                    >
                      {deletingId === gallery._id ? (
                        <svg
                          className="animate-spin h-4 w-4 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmModalOpen && galleryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{galleryToDelete.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setGalleryToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGallery(galleryToDelete._id);
                  setConfirmModalOpen(false);
                  setGalleryToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;