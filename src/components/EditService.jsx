"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EditService = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState({
    title: "",
    description: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
  })
  const [newImages, setNewImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [ogImage, setOgImage] = useState(null)
  const [ogImagePreview, setOgImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchService()
  }, [slug])

  const fetchService = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/services/${slug}`)
      const serviceData = response.data.service

      setService(serviceData)
      setExistingImages(serviceData.images || [])
      if (serviceData.ogImage) {
        setOgImagePreview(`${API_BASE_URL}${serviceData.ogImage}`)
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching service:", error)
      setError("Failed to load service. Please try again.")
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setService({ ...service, [name]: value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    processSelectedFiles(files)
  }

  const handleOgImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setOgImage(file)
      setOgImagePreview(URL.createObjectURL(file))
    }
  }

  const processSelectedFiles = (files) => {
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024)

    if (validFiles.length !== files.length) {
      setError("Some files were skipped because they exceed the 10MB limit")
      setTimeout(() => setError(null), 3000)
    }

    setNewImages((prev) => [...prev, ...validFiles])

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
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

  const deleteExistingImage = (filename) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return

    setExistingImages(existingImages.filter((img) => img !== filename))
    setSuccess("Image removed. Save changes to confirm deletion.")

    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }

  const removeNewImage = (idx) => {
    const updatedImages = [...newImages]
    updatedImages.splice(idx, 1)
    setNewImages(updatedImages)

    const updatedPreviews = [...previews]
    URL.revokeObjectURL(updatedPreviews[idx])
    updatedPreviews.splice(idx, 1)
    setPreviews(updatedPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!service.title.trim()) {
      setError("Title is required")
      setIsSubmitting(false)
      return
    }

    if (!service.description.trim()) {
      setError("Description is required")
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append("title", service.title)
    formData.append("description", service.description)
    formData.append("metaTitle", service.metaTitle || service.title)
    formData.append("metaDescription", service.metaDescription || service.description.substring(0, 160))
    formData.append("keywords", service.keywords || "")
    formData.append("ogTitle", service.ogTitle || service.title)
    formData.append("ogDescription", service.ogDescription || service.description.substring(0, 160))
    formData.append("slug", service.slug || service.title.toLowerCase().replace(/\s+/g, '-'))
    if (ogImage) formData.append("ogImage", ogImage)

    formData.set("keepImages", JSON.stringify(existingImages));


    if (newImages.length > 0) {
      newImages.forEach((img) => formData.append("images", img))
    }

    try {
      await axios.put(`${API_BASE_URL}/api/services/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsSubmitting(false)
      navigate("/manage-services")
    } catch (error) {
      console.error("Error updating service:", error)
      setError("Failed to update service. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Service</h1>
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
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Service Information</h2>
            <p className="text-sm text-blue-100">Update the details for your service</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Title <span className="text-indigo-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={service.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter service title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description <span className="text-indigo-500">*</span>
              </label>
              <textarea
                name="description"
                value={service.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your service description here..."
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <p className="text-sm text-blue-100">Optimize your service for search engines</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={service.metaTitle || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Meta title for SEO"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: 50-60 characters</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={service.keywords || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="comma separated keywords"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
              <input
                type="text"
                name="slug"
                value={service.slug || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="URL slug for the service"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
              <textarea
                name="metaDescription"
                value={service.metaDescription || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Meta description for SEO"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: 150-160 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">OpenGraph Title</label>
                <input
                  type="text"
                  name="ogTitle"
                  value={service.ogTitle || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Title for social sharing"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">OpenGraph Description</label>
                <input
                  type="text"
                  name="ogDescription"
                  value={service.ogDescription || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description for social sharing"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">OpenGraph Image</h2>
            <p className="text-sm text-blue-100">Update the OpenGraph image for social sharing</p>
          </div>
          <div className="p-6">
            {ogImagePreview && ogImagePreview.startsWith(API_BASE_URL) && (
              <div className="mb-4 relative group">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current OG Image</h3>
                <div className="relative">
                  <img
                    src={ogImagePreview}
                    alt="Current OG image"
                    className="h-32 object-cover rounded-lg w-full max-w-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={() => {
                        setOgImage(null)
                        setOgImagePreview(null)
                      }} 
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
                </div>
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleOgImageChange}
                className="hidden"
                id="og-image"
                accept="image/*"
              />
              <label htmlFor="og-image" className="cursor-pointer flex flex-col items-center justify-center">
                {ogImagePreview ? (
                  <img
                    src={ogImagePreview}
                    alt="OG Preview"
                    className="h-32 object-cover rounded-lg mb-2 w-full max-w-xs mx-auto"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {ogImagePreview ? "Click to change image" : "Click to upload OG image (optional)"}
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Service Images</h2>
            <p className="text-sm text-blue-100">Add or remove images from your service</p>
          </div>

          <div className="p-6">
            {existingImages.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Images ({existingImages.length})
                  </h3>
                  {existingImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove all images?")) {
                          setExistingImages([])
                        }
                      }}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600"
                    >
                      Remove all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={`${API_BASE_URL}${img}`}
                        alt={`Image ${idx + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => deleteExistingImage(img)}
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
                id="service-images"
                accept="image/*"
              />
              <label htmlFor="service-images" className="cursor-pointer flex flex-col items-center justify-center py-4">
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
                        setNewImages([])
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
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${idx + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeNewImage(idx)}
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

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/manage-services")}
            className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
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
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditService