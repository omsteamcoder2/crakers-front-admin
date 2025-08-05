"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllCategories } from "../services/CategoryServices";

const EditProduct = () => {
  const { code: productCode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    category: "Sparklers",
    productCode: "",
    boxQuantity: "",
    piecesPerBox: "",
    price: "",
    offerPercentage: 0,
    videoUrl: "",
    tags: "",
    seoTitle: "",
    metaDescription: "",
    image: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [productCode]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/products/${productCode}`
      );
      const productData = response.data.product;
      setProduct({
        ...productData,
        tags: productData.tags?.join(", ") || "",
      });
      setImagePreview(
        productData.image ? `${API_BASE_URL}${productData.image}` : null
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/category`);
      const active = res.data.categories.filter((cat) => cat.isActive);
      setCategories(active);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
const handleTagSelection = (tag) => {
  setProduct({ ...product, tags: tag }); // Set the selected tag as the only tag
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const deleteImage = () => {
    if (!window.confirm("Are you sure you want to delete the product image?"))
      return;

    setRemoveImage(true);
    setNewImage(null);
    setImagePreview(null);
    setSuccess("Product image removed. Save changes to confirm deletion.");

    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!product.productName.trim()) {
      setError("Product name is required");
      setIsSubmitting(false);
      return;
    }

    if (!product.productCode.trim()) {
      setError("Product code is required");
      setIsSubmitting(false);
      return;
    }

    if (!product.price) {
      setError("Price is required");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("category", product.category);
    formData.append("productCode", product.productCode);
    if (product.boxQuantity !== "" && product.boxQuantity !== null && product.boxQuantity !== "null") {
  formData.append("boxQuantity", product.boxQuantity);
}

if (product.piecesPerBox !== "" && product.piecesPerBox !== null && product.piecesPerBox !== "null") {
  formData.append("piecesPerBox", product.piecesPerBox);
}

    formData.append("price", product.price);
    formData.append("offerPercentage", product.offerPercentage || 0);
    formData.append("videoUrl", product.videoUrl || "");
    formData.append("tags", product.tags);
    formData.append("seoTitle", product.seoTitle || product.productName);
    formData.append(
      "metaDescription",
      product.metaDescription ||
        `${product.productName} - High quality firecracker product`
    );

    if (removeImage) {
      formData.append("removeImage", "true");
    } else if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await axios.put(`${API_BASE_URL}/api/products/${productCode}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitting(false);
      navigate("/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update product. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto py-6 px-1 md:px-4 bg-gradient-to-b from-red-50 to-orange-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-800">
          Edit Fireworks Product
        </h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p>{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Product Information Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200">
          <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <h2 className="text-lg font-semibold">Product Information</h2>
            <p className="text-sm text-orange-100">
              Update the details for your fireworks product
            </p>
          </div>

          <div className="p-2 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 10cm Red Sparkler"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Category
                </label>
                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productCode"
                  value={product.productCode}
                  onChange={handleInputChange}
                  placeholder="Unique product code/SKU"
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Box Quantity
                </label>
                <input
                  type="text"
                  name="boxQuantity"
                  value={product.boxQuantity || ""}
                  onChange={handleInputChange}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 1 Box, 2 Boxes"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Pieces Per Box
                </label>
                <input
                  type="number"
                  name="piecesPerBox"
                  value={product.piecesPerBox || ""}
                  onChange={handleInputChange}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Number of pieces in each box"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price || ""}
                  onChange={handleInputChange}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Price in INR"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Offer Percentage (%)
                </label>
                <input
                  type="number"
                  name="offerPercentage"
                  value={product.offerPercentage || 0}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Discount percentage (0-100)"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-red-800">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={product.videoUrl || ""}
                  onChange={handleInputChange}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="YouTube or video link"
                />
              </div>
            </div>

          <div className="space-y-2">
  <label className="block text-sm font-medium text-red-800">
    Tags
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
        onClick={() => handleTagSelection(tagOption)} // Set the clicked tag
        className={`px-4 py-2 rounded-lg border ${
          product.tags === tagOption // Check if the tag is selected
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200">
          <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <p className="text-sm text-orange-100">
              Optimize your product for search engines
            </p>
          </div>

          <div className="p-2 md:p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-red-800">
                SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={product.seoTitle || ""}
                onChange={handleInputChange}
                className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Meta title for SEO"
              />
              <p className="text-xs text-orange-600">
                Recommended: 50-60 characters
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-red-800">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={product.metaDescription || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Meta description for SEO"
              />
              <p className="text-xs text-orange-600">
                Recommended: 150-160 characters
              </p>
            </div>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200">
          <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <h2 className="text-lg font-semibold">Product Image</h2>
            <p className="text-sm text-orange-100">
              Update the main image for your product
            </p>
          </div>

          <div className="p-6">
            {product.image && !imagePreview && !removeImage && (
              <div className="mb-4 relative group">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Current Product Image
                </h3>
                <div className="relative">
                  <img
                    src={`${API_BASE_URL}${product.image}`}
                    alt="Current product"
                    className="h-48 w-full object-contain bg-white rounded-lg border border-orange-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      type="button"
                      onClick={deleteImage}
                      className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                    >
                      <svg
                        className="w-4 h-4"
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
                </div>
              </div>
            )}

            <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="product-image"
                accept="image/*"
              />
              <label
                htmlFor="product-image"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="h-48 w-full object-contain bg-white rounded-lg mb-2 border border-orange-200"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-orange-400 mb-2"
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
                    <p className="text-sm text-orange-600 mb-1">
                      {imagePreview
                        ? "Click to change image"
                        : "Click to upload product image"}
                    </p>
                    <p className="text-xs text-orange-500">
                      Recommended size: 800x800px
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/manage-products")}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
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
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
