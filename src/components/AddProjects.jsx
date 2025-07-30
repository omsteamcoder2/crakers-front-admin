"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Residential");
  const [location, setLocation] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [ogImage, setOgImage] = useState(null);
  const [ogPreview, setOgPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [servicesProvided, setServicesProvided] = useState("");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [safetyMeasures, setSafetyMeasures] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false)
  const [additionalOpen, setAdditionalOpen] = useState(false);

  function extractMapSrc(iframeInput) {
    const match = iframeInput.match(/src="([^"]+)"/);
    return match ? match[1] : iframeInput;
  }

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleOgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOgImage(file);
      setOgPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleGalleryChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const removeGalleryImage = (idx) => {
    const newGallery = [...gallery];
    newGallery.splice(idx, 1);
    setGallery(newGallery);

    const newPreviews = [...galleryPreviews];
    URL.revokeObjectURL(newPreviews[idx]);
    newPreviews.splice(idx, 1);
    setGalleryPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    if (!coverImage) {
      setError("Cover image is required");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    const generatedSlug =
      slug.trim() ||
      title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
    formData.append("slug", generatedSlug);
    formData.append("excerpt", excerpt);
    formData.append("location", location);

    formData.append("servicesProvided", servicesProvided);
    formData.append("materialsUsed", materialsUsed);
    formData.append("safetyMeasures", safetyMeasures);

    formData.append("coverImage", coverImage);
    formData.append("metaTitle", metaTitle || title);
    formData.append(
      "metaDescription",
      metaDescription || description.substring(0, 160)
    );
    formData.append("keywords", keywords);
    formData.append("ogTitle", ogTitle || title);
    formData.append(
      "ogDescription",
      ogDescription || description.substring(0, 160)
    );
    if (ogImage) formData.append("ogImage", ogImage);

    if (gallery.length > 0) {
      gallery.forEach((img) => formData.append("gallery", img));
    }

    try {
      await axios.post(`${API_BASE_URL}/api/create-project`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitting(false);
      navigate("/manage-projects");
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project. Please try again.");
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (!slug && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
      );
    }
  }, [title]);

  return (
    <div className="w-full max-w-full mx-auto py-4 md:py-6 px-2 md:px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Project
        </h1>
        <p className="text-gray-600">
          Fill out the details below to add a new project to your portfolio
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-start">
          <svg
            className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Project Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-2 md:px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Project Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Basic details about your project
            </p>
          </div>

          <div className="p-2 md:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setTitle(newTitle);

                    if (!isSlugEdited) {
                      const generated = newTitle
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w\-]+/g, "");
                      setSlug(generated);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Project location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Describe your project..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugEdited(true); // user is overriding auto-generated slug
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g. commercial-kitchen-installation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Short summary shown in project cards"
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
  {/* Toggleable Header */}
  <div
    onClick={() => setAdditionalOpen(prev => !prev)}
    className="px-2 md:px-6 border-b border-gray-200 py-4 cursor-pointer flex items-center justify-between"
  >
    <div>
      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
        <svg
          className="w-5 h-5 text-blue-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        Additional Information
      </h2>
      <p className="text-sm text-gray-500 mt-1">Extra details about your project</p>
    </div>

    {/* Expand/Collapse icon */}
    <svg
      className={`w-5 h-5 transform transition-transform duration-200 ${additionalOpen ? "rotate-180" : "rotate-0"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {/* Toggleable Content */}
  {additionalOpen && (
    <div className="p-2 md:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Provided
          </label>
          <input
            type="text"
            value={servicesProvided}
            onChange={(e) => setServicesProvided(e.target.value)}
            placeholder="Services Provided (comma separated)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Materials Used
          </label>
          <input
            type="text"
            value={materialsUsed}
            onChange={(e) => setMaterialsUsed(e.target.value)}
            placeholder="Materials Used (comma separated)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Safety Measures
          </label>
          <input
            type="text"
            value={safetyMeasures}
            onChange={(e) => setSafetyMeasures(e.target.value)}
            placeholder="Safety Measures (optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>
    </div>
  )}
</div>


        {/* SEO Settings Section */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Toggleable Header */}
      <div
        onClick={() => setSeoOpen(prev => !prev)}
        className="px-2 md:px-6 border-b border-gray-200 cursor-pointer flex items-center justify-between py-4"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            SEO Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">Optimize for search engines</p>
        </div>

        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${seoOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Toggleable Content */}
      {seoOpen && (
        <div className="p-2 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Meta title for SEO"
              />
              <p className="mt-1 text-xs text-gray-500">Recommended: 50-60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="comma separated keywords"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Meta description for SEO"
            />
            <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenGraph Title</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Title for social sharing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenGraph Description</label>
              <input
                type="text"
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Description for social sharing"
              />
            </div>
          </div>
        </div>
      )}
    </div>

        {/* Media Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-2 md:px-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Media
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload images for your project
            </p>
          </div>

          <div className="p-2 md:p-6 space-y-8">
            {/* Cover Image */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Cover Image</h3>
                  <p className="text-sm text-gray-500">
                    Main image for the project (required)
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleCoverImageChange}
                  className="hidden"
                  id="cover-image"
                  accept="image/*"
                />
                <label
                  htmlFor="cover-image"
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer text-sm font-medium"
                >
                  {coverPreview ? "Change Image" : "Select Image"}
                </label>
              </div>

              <input
                type="file"
                onChange={handleCoverImageChange}
                className="hidden"
                id="cover-image-area"
                accept="image/*"
              />
              <label
                htmlFor="cover-image-area"
                className="block border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer"
              >
                {coverPreview ? (
                  <div className="relative">
                    <img
  src={coverPreview}
  alt="Cover Preview"
  className="w-full max-h-64 object-contain bg-white border"
/>


                    <div className="absolute bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <span className="text-white bg-black bg-opacity-70 px-3 py-1 rounded-lg text-sm">
                        Click to change
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-10 text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600">Click to select cover image</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended size: 1200×630px
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* OpenGraph Image */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">OpenGraph Image</h3>
                  <p className="text-sm text-gray-500">
                    Image for social sharing (optional)
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleOgImageChange}
                  className="hidden"
                  id="og-image"
                  accept="image/*"
                />
              </div>

              <label htmlFor="og-image" className="cursor-pointer block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition">
                  {ogPreview ? (
                    <img
                      src={ogPreview}
                      alt="OG Preview"
                      className="w-full max-h-64 object-contain bg-white border"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <svg
                        className="w-10 h-10 text-gray-400 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 010 10H13m0 0l-3-3m3 3l3-3m-3 3V10"
                        />
                      </svg>

                      <p className="text-gray-600">
                        No OpenGraph image selected
                      </p>
                      <p className="text-sm text-gray-500">
                        Click to upload image
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Gallery Images */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Gallery Images</h3>
                  <p className="text-sm text-gray-500">
                    Additional project images (optional)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                  id="gallery-images"
                  accept="image/*"
                />
              </div>

              <label
                htmlFor="gallery-images"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
              >
                <svg
                  className="w-10 h-10 text-gray-400 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600 font-medium mb-1">
                  Drag and drop images here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>

              {galleryPreviews.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">
                      Selected Images{" "}
                      <span className="text-gray-500">
                        ({galleryPreviews.length})
                      </span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        galleryPreviews.forEach((url) =>
                          URL.revokeObjectURL(url)
                        );
                        setGalleryPreviews([]);
                        setGallery([]);
                      }}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142..."
                        />
                      </svg>
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryPreviews.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          className="h-32 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/manage-projects")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-70 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                Creating Project...
              </>
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
