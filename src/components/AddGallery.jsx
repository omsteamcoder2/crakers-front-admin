"use client";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/CategoryServices";

const AddGallery = () => {
  const [category, setCategory] = useState("Rockets");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
const categories = [
  "Wedding",
  "Festival",
  "New Year",
  "Birthday",
  "Diwali",
  "Christmas",
  "Public Celebration",
  "Grand Opening"
];

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processSelectedFiles(files);
  };

  const processSelectedFiles = (files) => {
    const validFiles = files.filter((file) => {
      const isWithinSizeLimit = file.size <= 10 * 1024 * 1024;
      const isImage = file.type.startsWith("image/");
      return isWithinSizeLimit && isImage;
    });

    if (validFiles.length !== files.length) {
      setError("Some files were skipped - only images under 10MB are allowed");
      setTimeout(() => setError(null), 3000);
    }

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
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
      processSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeImage = (idx) => {
    const newImages = [...images];
    newImages.splice(idx, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[idx]);
    newPreviews.splice(idx, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (images.length === 0) {
      setError("Please upload at least one image.");
      setIsSubmitting(false);
      setTimeout(() => {
        const el = document.getElementById("error-box");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    if (images.length > 10) {
      setError("You can upload a maximum of 10 images.");
      setIsSubmitting(false);
      setTimeout(() => {
        const el = document.getElementById("error-box");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const invalidFiles = images.filter((img) => img.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError("Some images are too large. Max 10MB per image.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    images.forEach((img) => {
      formData.append("gallery", img);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/gallery-upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      previews.forEach((url) => URL.revokeObjectURL(url));
      setIsSubmitting(false);
      navigate("/manage-gallery");
    } catch (err) {
      console.error("Upload error:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Upload failed. Please try again.";
      setError(message);
      setIsSubmitting(false);
      setTimeout(() => {
        const el = document.getElementById("error-box");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-full mx-auto py-4 sm:py-6 px-2 md:px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Add Firecracker Images
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Upload images to your firecracker gallery
          </p>
        </div>
      </div>

      {error && (
        <div id="error-box" className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-lg flex items-center shadow-sm text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Gallery Information Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 to-orange-500 text-white">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Firecracker Information
                </h2>
                <p className="text-orange-100 text-xs sm:text-sm mt-1">
                  Select category for your firecracker images
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md appearance-none bg-white"
>
  {categories.map((cat, idx) => (
  <option key={idx} value={cat}>
    {cat}
  </option>
))}
</select>

              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 to-orange-500 text-white">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Firecracker Images
                </h2>
                <p className="text-orange-100 text-xs sm:text-sm mt-1">
                  Upload images of your firecrackers
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                dragActive
                  ? "border-red-500 bg-red-50 shadow-inner"
                  : "border-gray-300 hover:border-red-400 bg-gray-50"
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
                className="cursor-pointer flex flex-col items-center justify-center py-2 sm:py-4"
              >
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                  Drag and drop images here
                </p>
                <p className="text-gray-500 mb-3 text-sm sm:text-base">
                  or click to browse files
                </p>
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                  <svg
                    className="w-4 h-4 mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Select Images
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Supports JPG, PNG, GIF • Max 10MB per image
                </p>
              </label>
            </div>

            {previews.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    Selected Images ({previews.length})
                  </h3>
                  {previews.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        previews.forEach((url) => URL.revokeObjectURL(url));
                        setPreviews([]);
                        setImages([]);
                      }}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-800 flex items-center"
                    >
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
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {previews.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="h-32 sm:h-40 w-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1 sm:p-2 bg-white rounded-full text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 bg-white/80 text-gray-700 text-xxs sm:text-xs px-1.5 py-0.5 rounded">
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
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={() => navigate("/manage-gallery")}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || images.length === 0}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 text-white rounded-lg flex items-center justify-center min-w-[140px] sm:min-w-[180px] text-sm sm:text-base ${
              isSubmitting || images.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-md hover:shadow-lg transition-all"
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
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-1 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Images
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGallery;