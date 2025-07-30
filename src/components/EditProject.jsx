"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EditProject = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState({
    title: "",
    excerpt: "",
    description: "",
    category: "Residential",
    location: "",
    slug: "",
    coverImage: "",
    gallery: [],
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    servicesProvided: "",
    materialsUsed: "",
    safetyMeasures: "",
  })

  const [newCoverImage, setNewCoverImage] = useState(null)
  const [newOgImage, setNewOgImage] = useState(null)
  const [newGalleryImages, setNewGalleryImages] = useState([])
  const [coverPreview, setCoverPreview] = useState(null)
  const [ogPreview, setOgPreview] = useState(null)
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [keepGalleryImages, setKeepGalleryImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [removeCoverImage, setRemoveCoverImage] = useState(false)
  const [removeOgImage, setRemoveOgImage] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchProject()
  }, [slug])

  const fetchProject = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects/${slug}`)
      const projectData = response.data.project
      setProject(projectData)
      setKeepGalleryImages(projectData.gallery || [])
      setCoverPreview(projectData.coverImage ? `${API_BASE_URL}${projectData.coverImage}` : null)
      setOgPreview(projectData.ogImage ? `${API_BASE_URL}${projectData.ogImage}` : null)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching project:", error)
      setError("Failed to load project. Please try again.")
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...project.testimonials]
    updatedTestimonials[index][field] = value
    setProject({ ...project, testimonials: updatedTestimonials })
  }

  const addTestimonial = () => {
    setProject({
      ...project,
      testimonials: [...project.testimonials, { name: "", text: "", rating: "" }]
    })
  }

  const removeTestimonial = (index) => {
    const updatedTestimonials = [...project.testimonials]
    updatedTestimonials.splice(index, 1)
    setProject({ ...project, testimonials: updatedTestimonials })
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewCoverImage(file)
      setCoverPreview(URL.createObjectURL(file))
      setRemoveCoverImage(false)
    }
  }

  const handleOgImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewOgImage(file)
      setOgPreview(URL.createObjectURL(file))
      setRemoveOgImage(false)
    }
  }

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setNewGalleryImages(prev => [...prev, ...files])
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setGalleryPreviews(prev => [...prev, ...newPreviews])
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
      handleGalleryImagesChange({ target: { files: e.dataTransfer.files } })
    }
  }

  const removeGalleryImage = (idx) => {
    const newImages = [...newGalleryImages]
    newImages.splice(idx, 1)
    setNewGalleryImages(newImages)

    const newPreviews = [...galleryPreviews]
    URL.revokeObjectURL(newPreviews[idx])
    newPreviews.splice(idx, 1)
    setGalleryPreviews(newPreviews)
  }

  const deleteGalleryImage = (filename) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return

    setKeepGalleryImages(keepGalleryImages.filter((img) => img !== filename))
    setSuccess("Image removed. Save changes to confirm deletion.")

    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }

  const deleteCoverImage = () => {
    if (!window.confirm("Are you sure you want to delete the cover image?")) return

    setRemoveCoverImage(true)
    setNewCoverImage(null)
    setCoverPreview(null)
    setSuccess("Cover image removed. Save changes to confirm deletion.")

    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }

  const deleteOgImage = () => {
    if (!window.confirm("Are you sure you want to delete the OG image?")) return

    setRemoveOgImage(true)
    setNewOgImage(null)
    setOgPreview(null)
    setSuccess("OG image removed. Save changes to confirm deletion.")

    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!project.title.trim()) {
      setError("Title is required")
      setIsSubmitting(false)
      return
    }

    if (!project.excerpt.trim()) {
      setError("Excerpt is required")
      setIsSubmitting(false)
      return
    }

    if (!project.description.trim()) {
      setError("Description is required")
      setIsSubmitting(false)
      return
    }
const formattedDate = project.projectDate
  ? new Date(project.projectDate).toISOString().split("T")[0]
  : ""
const extractMapSrc = (input) => {
  const match = input?.match(/src="([^"]+)"/);
  return match ? match[1] : input;
};

    const formData = new FormData()
    formData.append("title", project.title)
    formData.append("excerpt", project.excerpt)
    formData.append("description", project.description)
    formData.append("category", project.category)
    formData.append("location", project.location)
    formData.append("servicesProvided", project.servicesProvided)
    formData.append("materialsUsed", project.materialsUsed)
    formData.append("safetyMeasures", project.safetyMeasures)
    formData.append("metaTitle", project.metaTitle || project.title)
    formData.append("metaDescription", project.metaDescription || project.description.substring(0, 160))
    formData.append("keywords", project.keywords)
    formData.append("ogTitle", project.ogTitle || project.title)
    formData.append("ogDescription", project.ogDescription || project.description.substring(0, 160))
    formData.append("slug", project.slug || project.title.toLowerCase().replace(/\s+/g, '-'))

    if (removeCoverImage) {
      formData.append("removeCoverImage", "true")
    } else if (newCoverImage) {
      formData.append("coverImage", newCoverImage)
    }

    if (removeOgImage) {
      formData.append("removeOgImage", "true")
    } else if (newOgImage) {
      formData.append("ogImage", newOgImage)
    }

    keepGalleryImages.forEach((img) => formData.append("keepGalleryImages", img))

    if (newGalleryImages.length > 0) {
      newGalleryImages.forEach((img) => formData.append("gallery", img))
    }

    try {
      await axios.put(`${API_BASE_URL}/api/projects/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsSubmitting(false)
      navigate("/manage-projects")
    } catch (error) {
      console.error("Error updating project:", error)
      setError("Failed to update project. Please try again.")
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
    <div className="w-full max-w-full mx-auto py-6 px-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Project</h1>
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Project Information</h2>
            <p className="text-sm text-blue-100">Update the details for your project</p>
          </div>

          <div className="p-2 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Project Title <span className="text-indigo-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={project.category || "Residential"}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                name="slug"
                value={project.slug}
                onChange={handleInputChange}
                placeholder="Project slug"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={project.location || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project location"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Excerpt <span className="text-indigo-500">*</span>
              </label>
              <textarea
                name="excerpt"
                value={project.excerpt || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a short project summary..."
                required
              />
              <p className="text-xs text-gray-500">Brief summary shown in project listings (required)</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-indigo-500">*</span>
              </label>
              <textarea
                name="description"
                value={project.description || ""}
                onChange={handleInputChange}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project..."
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Project Details Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Additional Details</h2>
            <p className="text-sm text-blue-100">Project specifications and client information</p>
          </div>

          <div className="p-2 md:p-6 space-y-4">

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Services Provided</label>
              <input
                type="text"
                name="servicesProvided"
                value={project.servicesProvided || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List of services provided"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Materials Used</label>
              <input
                type="text"
                name="materialsUsed"
                value={project.materialsUsed || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List of materials used"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Safety Measures</label>
              <input
                type="text"
                name="safetyMeasures"
                value={project.safetyMeasures || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Safety precautions taken"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <p className="text-sm text-blue-100">Optimize your project for search engines</p>
          </div>

          <div className="p-2 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={project.metaTitle || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Meta title for SEO"
                />
                <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={project.keywords || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="comma separated keywords"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                name="metaDescription"
                value={project.metaDescription || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Meta description for SEO"
              />
              <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">OpenGraph Title</label>
                <input
                  type="text"
                  name="ogTitle"
                  value={project.ogTitle || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Title for social sharing"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">OpenGraph Description</label>
                <input
                  type="text"
                  name="ogDescription"
                  value={project.ogDescription || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description for social sharing"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">OG Image</h2>
            <p className="text-sm text-blue-100">Update the OpenGraph image for social sharing</p>
          </div>
          <div className="p-6">
            {project.ogImage && !ogPreview && !removeOgImage && (
              <div className="mb-4 relative group">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current OG Image</h3>
                <div className="relative">
                  <img
                    src={`${API_BASE_URL}${project.ogImage}`}
                    alt="Current OG image"
                    className="h-32 object-cover rounded-lg w-full max-w-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={deleteOgImage} 
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

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleOgImageChange}
                className="hidden"
                id="og-image"
                accept="image/*"
              />
              <label htmlFor="og-image" className="cursor-pointer flex flex-col items-center justify-center">
                {ogPreview ? (
                  <img
                    src={ogPreview}
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
                <p className="text-sm text-gray-500 mb-1">
                  {ogPreview ? "Click to change image" : "Click to upload OG image (optional)"}
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Cover Image</h2>
            <p className="text-sm text-blue-100">Update the main image for your project</p>
          </div>

          <div className="p-6">
            {project.coverImage && !coverPreview && !removeCoverImage && (
              <div className="mb-4 relative group">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Cover Image</h3>
                <div className="relative">
                  <img
                    src={`${API_BASE_URL}${project.coverImage}`}
                    alt="Current cover"
                    className="h-32 object-cover rounded-lg w-full max-w-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={deleteCoverImage} 
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

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleCoverImageChange}
                className="hidden"
                id="cover-image"
                accept="image/*"
              />
              <label htmlFor="cover-image" className="cursor-pointer flex flex-col items-center justify-center">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
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
                <p className="text-sm text-gray-500 mb-1">
                  {coverPreview ? "Click to change image" : "Click to upload cover image"}
                </p>
                <p className="text-xs text-gray-500">Recommended size: 1200x630px</p>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-lg font-semibold">Gallery Images</h2>
            <p className="text-sm text-blue-100">Add or remove images from your project gallery</p>
          </div>

          <div className="p-6">
            {keepGalleryImages.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Current Gallery Images ({keepGalleryImages.length})
                  </h3>
                  {keepGalleryImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove all gallery images?")) {
                          setKeepGalleryImages([])
                        }
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Remove all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {keepGalleryImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={`${API_BASE_URL}${img}`}
                        alt={`Gallery ${idx + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => deleteGalleryImage(img)}
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
              className={`border-2 border-dashed ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} rounded-lg p-4 text-center hover:border-blue-500 transition-colors`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                onChange={handleGalleryImagesChange}
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
                <p className="text-sm text-gray-500 mb-1">Drag and drop images here or click to browse</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>

            {galleryPreviews.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">New Gallery Images ({galleryPreviews.length})</h3>
                  {galleryPreviews.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        galleryPreviews.forEach((url) => URL.revokeObjectURL(url))
                        setGalleryPreviews([])
                        setNewGalleryImages([])
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {galleryPreviews.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${idx + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
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
            onClick={() => navigate("/manage-projects")}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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

export default EditProject