"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/CategoryServices";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Sparklers");
  const [productCode, setProductCode] = useState("");
  const [boxQuantity, setBoxQuantity] = useState("");
  const [piecesPerBox, setPiecesPerBox] = useState("");
  const [price, setPrice] = useState("");
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [seoOpen, setSeoOpen] = useState(false);
const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!productName.trim()) {
      setError("Product name is required");
      setIsSubmitting(false);
      return;
    }

    if (!productCode.trim()) {
      setError("Product code is required");
      setIsSubmitting(false);
      return;
    }

    if (!image) {
      setError("Product image is required");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("productCode", productCode);
    formData.append("boxQuantity", boxQuantity);
    formData.append("piecesPerBox", piecesPerBox);
    formData.append("price", price);
    formData.append("offerPercentage", offerPercentage);
    formData.append("videoUrl", videoUrl);
    formData.append("tags", tags);
    formData.append("seoTitle", seoTitle || productName);
    formData.append(
      "metaDescription",
      metaDescription || `${productName} - High quality firecracker product`
    );
    formData.append("image", image);

    try {
      await axios.post(`${API_BASE_URL}/api/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitting(false);
      navigate("/manage-products");
    } catch (err) {
      console.error("Error creating product:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create product. Please try again."
      );
      setIsSubmitting(false);
    }
  };
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      const activeCategories = data.filter((cat) => cat.isActive); // filter only active
      setCategories(activeCategories);
      if (activeCategories.length > 0) {
        setCategory(activeCategories[0].name); // default to first active category
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  fetchCategories();
}, []);

  return (
    <div className="w-full max-w-full mx-auto py-4 md:py-6 px-2 md:px-4 bg-gradient-to-b from-red-50 to-orange-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-800 mb-2">
          Add New Fireworks Product
        </h1>
        <p className="text-orange-600">
          Fill out the details below to add a new product to your inventory
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-start">
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
        {/* Product Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200">
          <div className="px-2 md:px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-red-50 to-orange-50 rounded-t-xl">
            <h2 className="text-xl font-semibold text-red-800 flex items-center">
              <svg
                className="w-5 h-5 text-red-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Product Information
            </h2>
            <p className="text-sm text-orange-600 mt-1">
              Basic details about your fireworks product
            </p>
          </div>

          <div className="p-2 md:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="e.g., 10cm Red Sparkler"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
>
  {categories.map((cat) => (
    <option key={cat._id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Unique product code/SKU"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Box Quantity
                </label>
                <input
                  type="number"
                  value={boxQuantity}
                  onChange={(e) => setBoxQuantity(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="e.g., 1, 2, 10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Pieces Per Box
                </label>
                <input
                  type="number"
                  value={piecesPerBox}
                  onChange={(e) => setPiecesPerBox(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Number of pieces in each box"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Price in INR"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Offer Percentage (%)
                </label>
                <input
                  type="number"
                  value={offerPercentage}
                  onChange={(e) => setOfferPercentage(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Discount percentage (0-100)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="YouTube or video link"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Select Tag
              </label>
              <div className="flex gap-2 flex-wrap">
                {[
                  "Bestseller",
                  "New Arrival",
                  "Diwali Special",
                  "Kids Friendly",
                ].map((tagOption) => (
                  <button
                    key={tagOption}
                    type="button"
                    onClick={() => setTags(tagOption)}
                    className={`px-4 py-2 rounded-lg border ${
                      tags === tagOption
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-red-800 border-orange-300"
                    } transition`}
                  >
                    {tagOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200">
          <div
            onClick={() => setSeoOpen(!seoOpen)}
            className="px-2 md:px-6 border-b border-orange-200 cursor-pointer flex items-center justify-between py-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-t-xl"
          >
            <div>
              <h2 className="text-xl font-semibold text-red-800 flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
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
              <p className="text-sm text-orange-600 mt-1">
                Optimize for search engines
              </p>
            </div>

            <svg
              className={`w-5 h-5 text-red-600 transform transition-transform duration-200 ${
                seoOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {seoOpen && (
            <div className="p-2 md:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Title for search engines"
                />
                <p className="mt-1 text-xs text-orange-600">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Description for search engines"
                />
                <p className="mt-1 text-xs text-orange-600">
                  Recommended: 150-160 characters
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Product Image Section */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200">
          <div className="px-2 md:px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-red-50 to-orange-50 rounded-t-xl">
            <h2 className="text-xl font-semibold text-red-800 flex items-center">
              <svg
                className="w-5 h-5 text-red-600 mr-2"
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
              Product Image
            </h2>
            <p className="text-sm text-orange-600 mt-1">
              Upload high-quality image of your fireworks product
            </p>
          </div>

          <div className="p-2 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium text-red-800">Main Image</h3>
                <p className="text-sm text-orange-600">
                  Display image for the product (required)
                </p>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="product-image"
                accept="image/*"
              />
              <label
                htmlFor="product-image"
                className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors cursor-pointer text-sm font-medium"
              >
                {imagePreview ? "Change Image" : "Select Image"}
              </label>
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              id="product-image-area"
              accept="image/*"
            />
            <label
              htmlFor="product-image-area"
              className="block border-2 border-dashed border-orange-300 rounded-lg overflow-hidden cursor-pointer hover:border-red-400 transition"
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-full max-h-96 object-contain bg-white border"
                  />
                  <div className="absolute  bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                    <span className="text-white bg-black bg-opacity-70 px-3 py-1 rounded-lg text-sm">
                      Click to change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center">
                  <svg
                    className="w-12 h-12 text-orange-400 mb-4"
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
                  <p className="text-orange-600">
                    Click to select product image
                  </p>
                  <p className="text-sm text-orange-500 mt-1">
                    Recommended size: 800×800px
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-orange-200">
          <button
            type="button"
            onClick={() => navigate("/manage-products")}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors font-medium text-sm sm:text-base disabled:opacity-70 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                Adding Product...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
