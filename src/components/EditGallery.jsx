"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditGallery = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("General")
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [existingImages, setExistingImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [keywords, setKeywords] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    if (id) {
      fetchGalleryData()
    }
  }, [id])

  const fetchGalleryData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/galleries/${id}`)
      const galleryData = response.data.gallery
      
      setTitle(galleryData.title || "")
      setDescription(galleryData.description || "")
      setCategory(galleryData.category || "General")
      setExistingImages(galleryData.images || [])
      setMetaTitle(galleryData.metaTitle || "")
      setMetaDescription(galleryData.metaDescription || "")
      setKeywords(galleryData.keywords || "")

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching gallery:", error)
      setError("Failed to load gallery data. Please try again.")
      setIsLoading(false)
    }
  }

const deleteExistingImage = (filename) => {
  if (!window.confirm("Are you sure you want to remove this image?")) return;

  setExistingImages(prev => prev.filter((img) => img !== filename));
};


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    processSelectedFiles(files)
  }

const processSelectedFiles = (files) => {
  const uniqueNewFiles = files.filter(file => {
    const isImage = file.type.startsWith('image/')
    const isDuplicate = images.some(img => img.name === file.name && img.size === file.size)
    return isImage && !isDuplicate
  })

  if (uniqueNewFiles.length < files.length) {
    setError("Some files were skipped because they are duplicates or not valid images.")
    setTimeout(() => setError(null), 3000)
  }

  if (uniqueNewFiles.length > 0) {
    setImages(prev => [...prev, ...uniqueNewFiles])
    const newPreviews = uniqueNewFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }
}


  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeImage = (idx) => {
    const newImages = [...images]
    newImages.splice(idx, 1)
    setImages(newImages)

    const newPreviews = [...previews]
    URL.revokeObjectURL(newPreviews[idx])
    newPreviews.splice(idx, 1)
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    if (images.length === 0 && existingImages.length === 0) {
      setIsSubmitting(false)
      return setError("Please upload at least one image")
    }

    const formData = new FormData()
    
    // Append text fields
    formData.append("title", title)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("metaTitle", metaTitle || title)
    formData.append("metaDescription", metaDescription || description.substring(0, 160))
    formData.append("keywords", keywords)
    formData.append("keepImages", JSON.stringify(existingImages));

    // Append new images with the correct field name 'gallery'
    images.forEach((img) => {
      formData.append(`gallery`, img)
    })

    try {
      const response = await axios.put(`${API_BASE_URL}/api/galleries/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Clean up object URLs
      previews.forEach(url => URL.revokeObjectURL(url))
      
      setSuccess("Gallery updated successfully!")
      setIsSubmitting(false)

      setTimeout(() => {
        navigate("/manage-gallery")
      }, 2000)
    } catch (err) {
      console.error("Update error:", err)
      setError(err.response?.data?.message || "Update failed. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Gallery</h1>
      </div>

      {error && (
        <div className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>{success}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Gallery Information Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h2 className="text-lg font-semibold">Gallery Information</h2>
              <p className="text-sm text-blue-100">Update the details for your gallery</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Gallery title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General">General</option>
                    <option value="Construction">Construction</option>
                    <option value="Interior">Interior Design</option>
                    <option value="Landscape">Landscape</option>
                    <option value="BeforeAfter">Before & After</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your gallery..."
                />
              </div>
            </div>
          </div>

          {/* SEO Settings Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h2 className="text-lg font-semibold">SEO Settings</h2>
              <p className="text-sm text-blue-100">Optimize your gallery for search engines</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Meta title for SEO"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: 50-60 characters</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Meta description for SEO"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: 150-160 characters</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="comma separated keywords"
                />
              </div>
            </div>
          </div>

          {/* Existing Images Section */}
          {existingImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <h2 className="text-lg font-semibold">Existing Images</h2>
                <p className="text-sm text-blue-100">Current images in this gallery</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={`${API_BASE_URL}${img}`}
                        alt={`Gallery image ${idx + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => deleteExistingImage(img)}
                          className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* New Image Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h2 className="text-lg font-semibold">Add More Images</h2>
              <p className="text-sm text-blue-100">Upload additional images for your gallery</p>
            </div>

            <div className="p-6">
              <div
                className={`border-2 border-dashed ${dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"} rounded-lg p-4 text-center hover:border-blue-500 transition-colors`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="gallery-images"
                  accept="image/*"
                />
                <label htmlFor="gallery-images" className="cursor-pointer flex flex-col items-center justify-center py-4">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Drag and drop images here or click to browse</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>

              {previews.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">New Images ({previews.length})</h3>
                    {previews.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          previews.forEach((url) => URL.revokeObjectURL(url))
                          setPreviews([])
                          setImages([])
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {previews.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          className="h-24 w-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder.svg'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/manage-gallery")}
              className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (images.length === 0 && existingImages.length === 0)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Gallery"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditGallery