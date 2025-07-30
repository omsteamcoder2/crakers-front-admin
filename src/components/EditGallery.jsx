"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Pencil, X, Image as ImageIcon, Trash2, RotateCw } from "lucide-react"

const EditGallery = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Residential")
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
      setCategory(galleryData.category || "Residential")
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
    setExistingImages(prev => prev.filter(img => img !== filename));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    processSelectedFiles(files)
  }

  const processSelectedFiles = (files) => {
    const validFiles = files.filter(file => {
      // Check file size (10MB limit)
      const isWithinSizeLimit = file.size <= 10 * 1024 * 1024
      // Check file type
      const isImage = file.type.startsWith('image/')
      return isWithinSizeLimit && isImage
    })
    
    if (validFiles.length !== files.length) {
      setError("Some files were skipped - only images under 10MB are allowed")
      setTimeout(() => setError(null), 3000)
    }

    if (validFiles.length > 0) {
      setImages(prev => [...prev, ...validFiles])
      const newPreviews = validFiles.map(file => URL.createObjectURL(file))
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
    formData.append("keepImages", JSON.stringify(existingImages))

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
      
      setSuccess("Gallery updated successfully! Redirecting to gallery page...")
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
    <div className="w-full max-w-full mx-auto py-8 px-2 md:px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Edit Gallery</h1>
        <p className="text-gray-600">Update your gallery with new images and information</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>{success}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <RotateCw className="h-10 w-10 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading gallery data...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          {/* Gallery Information Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Gallery Information</h2>
                  <p className="text-blue-100 text-sm mt-1">Update the details for your gallery</p>
                </div>
              </div>
            </div>

            <div className="p-2 md:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <span>Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                    placeholder="Gallery title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiA0NzVmNzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-right-3"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Repair">Repair</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                  placeholder="Describe your gallery..."
                />
              </div>
            </div>
          </div>

          {/* SEO Settings Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">SEO Settings</h2>
                  <p className="text-blue-100 text-sm mt-1">Optimize your gallery for search engines</p>
                </div>
              </div>
            </div>

            <div className="p-2 md:p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                  placeholder="Meta title for SEO"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
                  <p className="text-xs text-gray-500">{metaTitle.length}/60</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                  placeholder="Meta description for SEO"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
                  <p className="text-xs text-gray-500">{metaDescription.length}/160</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                  placeholder="comma separated keywords (e.g., kitchen, renovation, gas)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas for better SEO</p>
              </div>
            </div>
          </div>

          {/* Existing Images Section */}
          {existingImages.length > 0 && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Existing Images</h2>
                    <p className="text-blue-100 text-sm mt-1">Current images in this gallery</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={`${API_BASE_URL}${img}`}
                          alt={`Gallery image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.parentNode.classList.add("bg-gray-100")
                            e.target.replaceWith(
                              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <ImageIcon className="w-10 h-10 mb-2" />
                                <span className="text-xs">Image unavailable</span>
                              </div>
                            )
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteExistingImage(img)}
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* New Image Upload Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Add More Images</h2>
                  <p className="text-blue-100 text-sm mt-1">Upload additional images for your gallery</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  dragActive 
                    ? "border-blue-500 bg-blue-50 shadow-inner" 
                    : "border-gray-300 hover:border-blue-400 bg-gray-50"
                }`}
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
                <label 
                  htmlFor="gallery-images" 
                  className="cursor-pointer flex flex-col items-center justify-center py-4"
                >
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-800 mb-1">Drag and drop images here</p>
                  <p className="text-gray-500 mb-4">or click to browse files</p>
                  <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Select Images
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Supports JPG, PNG, GIF • Max 10MB per image</p>
                </label>
              </div>

              {previews.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">New Images ({previews.length})</h3>
                    {previews.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          previews.forEach((url) => URL.revokeObjectURL(url))
                          setPreviews([])
                          setImages([])
                        }}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previews.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/placeholder.svg'
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-all"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
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
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate("/manage-gallery")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (images.length === 0 && existingImages.length === 0)}
              className={`px-6 py-3 text-white rounded-lg flex items-center justify-center min-w-[180px] ${
                isSubmitting || (images.length === 0 && existingImages.length === 0)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
              }`}
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
                <>
                  <Pencil className="w-4 h-4 mr-2" />
                  Update Gallery
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditGallery