"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NoContent from "./NoContent";
import { Eye, Pencil, X, Search, Filter } from "lucide-react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [togglingProductCode, setTogglingProductCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
const [categories, setCategories] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products`);
    const productsData = response.data.products || []; // Make sure to handle the response properly
    setProducts(productsData);

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(productsData.map((p) => p.category)));
    setCategories(["All", ...uniqueCategories]);

    setError(null);
  } catch (error) {
    console.error("Error fetching products:", error);
    setError("Failed to load products. Please try again.");
    setProducts([]);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    // Apply filters whenever products, searchQuery or selectedCategory changes
   const filtered = products.filter((product) => {
      const matchesSearch = 
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const handleToggleProductStatus = async (code, currentStatus) => {
    try {
      setTogglingProductCode(code);

      // Optimistic update
      setProducts((prev) =>
        prev.map((p) =>
          p.productCode === code ? { ...p, isActive: !currentStatus } : p
        )
      );

      await axios.patch(`${API_BASE_URL}/api/products/${code}/toggle-status`, {
        isActive: !currentStatus,
      });
    } catch (err) {
      console.error("Failed to toggle product status", err);
      // Rollback in case of error
      setProducts((prev) =>
        prev.map((p) =>
          p.productCode === code ? { ...p, isActive: currentStatus } : p
        )
      );
    } finally {
      setTogglingProductCode(null);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setConfirmModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/products/${productToDelete.productCode}`
      );
      setProducts(products.filter((p) => p.productCode !== productToDelete.productCode));
      setConfirmModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (productCode) => {
    navigate(`/edit-product/${productCode}`);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full p-1 md:p-6 bg-gradient-to-b from-red-50 to-orange-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-red-800">
            Manage Fireworks Products
          </h1>
          <p className="text-xs sm:text-sm text-orange-600 mt-1">
            Total: {filteredProducts.length} products
          </p>
        </div>
        <Link
          to="/add-product"
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm sm:text-base rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
        >
          <span className="mr-1 font-bold">+</span> Add New Product
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or code..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
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

      {filteredProducts.length === 0 && !error ? (
        <NoContent
          type={"products"}
          message="No products found matching your criteria"
        />
      ) : (
        <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-orange-200">
          {/* Mobile view: Cards */}
          <div className="block sm:hidden">
            {filteredProducts.map((product) => (
              <div
                key={product.productCode}
                className="w-full border-b border-orange-100 p-1 flex items-start gap-3 hover:bg-orange-50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 h-14 w-14 bg-orange-100 rounded-lg overflow-hidden border border-orange-200">
                  {product.image ? (
                    <img
                      src={`${API_BASE_URL}${product.image}`}
                      alt={product.productName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-orange-400 bg-orange-50">
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="font-semibold text-red-800 text-sm line-clamp-1">
                    {product.productName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                      {product.category}
                    </span>
                    <span className="text-xs font-medium bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                      {product.boxQuantity}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-bold text-red-600 mr-2">
                      ₹{product.price}
                    </span>
                    {product.offerPercentage > 0 && (
                      <span className="text-xs line-through text-gray-500 mr-2">
                        ₹{Math.round(product.price / (1 - product.offerPercentage / 100))}
                      </span>
                    )}
                    {product.offerPercentage > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                        {product.offerPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 ">
                  <label className="inline-flex items-center cursor-pointer hover:opacity-95 transition-opacity">
                    <input
                      type="checkbox"
                      checked={product.isActive}
                      onChange={() => handleToggleProductStatus(product.productCode, product.isActive)}
                      className="sr-only peer"
                      disabled={togglingProductCode === product.productCode}
                    />
                    <div
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out
                        ${product.isActive ? "bg-indigo-600" : "bg-gray-300"} 
                        peer-checked:shadow-inner
                        ${togglingProductCode === product.productCode ? "opacity-70 cursor-not-allowed" : "peer-active:scale-95"}`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                          ${product.isActive ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </div>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-start items-center space-y-1 ml-1">
                  <button
                    onClick={() => viewProduct(product)}
                    className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="View product"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editProduct(product.productCode)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="Edit product"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Delete product"
                    title="Delete"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-orange-200">
              <thead className="bg-gradient-to-r from-red-50 to-orange-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider hidden md:table-cell">
                    Quantity
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.productCode}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 bg-orange-100 rounded-lg overflow-hidden border border-orange-200">
                          {product.image ? (
                            <img
                              src={`${API_BASE_URL}${product.image}`}
                              alt={product.productName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-orange-400 bg-orange-50">
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
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-3 sm:ml-4 min-w-0">
                          <div className="text-sm sm:text-base font-semibold text-red-800 line-clamp-1">
                            {product.productName}
                          </div>
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-1.5 py-0.5 bg-orange-100 text-orange-800 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-800 font-mono">
                      {product.productCode}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-800 hidden md:table-cell">
                      {product.boxQuantity} Box ({product.piecesPerBox} pcs)
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold text-red-600">
                          ₹{product.price}
                        </span>
                        {product.offerPercentage > 0 && (
                          <span className="text-xs text-gray-500">
                            <span className="line-through">
                              ₹{Math.round(product.price / (1 - product.offerPercentage / 100))}
                            </span>{" "}
                            <span className="text-green-600">
                              ({product.offerPercentage}% OFF)
                            </span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer hover:opacity-95 transition-opacity">
                        <input
                          type="checkbox"
                          checked={product.isActive}
                          onChange={() => handleToggleProductStatus(product.productCode, product.isActive)}
                          className="sr-only peer"
                          disabled={togglingProductCode === product.productCode}
                        />
                        <div
                          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out
                            ${product.isActive ? "bg-indigo-600" : "bg-gray-300"} 
                            peer-checked:shadow-inner
                            ${togglingProductCode === product.productCode ? "opacity-70 cursor-not-allowed" : "peer-active:scale-95"}`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                              ${product.isActive ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </div>
                      </label>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm sm:text-base font-medium">
                      <div className="flex justify-end space-x-2 sm:space-x-4">
                        <button
                          onClick={() => viewProduct(product)}
                          className="text-gray-600 hover:text-gray-800 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label="View product"
                          title="View"
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => editProduct(product.productCode)}
                          className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          aria-label="Edit product"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="text-red-600 hover:text-red-800 p-1 sm:p-2 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Delete product"
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
      {viewModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-orange-200">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 border-b border-orange-200">
                <h2 className="text-xl sm:text-2xl font-bold text-red-800">
                  Product Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-orange-500 hover:text-orange-700 p-1 sm:p-2 rounded-full hover:bg-orange-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {selectedProduct.image && (
                  <div className="border border-orange-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm">
                    <img
                      src={`${API_BASE_URL}${selectedProduct.image}`}
                      alt={selectedProduct.productName}
                      className="w-full h-48 sm:h-64 object-contain bg-white"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Product Name
                    </h3>
                    <p className="text-red-800 text-sm sm:text-base">
                      {selectedProduct.productName}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Product Code
                    </h3>
                    <p className="text-red-800 text-sm sm:text-base font-mono">
                      {selectedProduct.productCode}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Category
                    </h3>
                    <p className="text-red-800 text-sm sm:text-base">
                      {selectedProduct.category}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Box Quantity
                    </h3>
                    <p className="text-red-800 text-sm sm:text-base">
                      {selectedProduct.boxQuantity}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Pieces Per Box
                    </h3>
                    <p className="text-red-800 text-sm sm:text-base">
                      {selectedProduct.piecesPerBox}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                    <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Price
                    </h3>
                    <div className="flex items-center">
                      <span className="text-red-800 text-sm sm:text-base font-bold mr-2">
                        ₹{selectedProduct.price}
                      </span>
                      {selectedProduct.offerPercentage > 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          {selectedProduct.offerPercentage}% OFF
                        </span>
                      )}
                    </div>
                    {selectedProduct.offerPercentage > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Original: ₹{Math.round(selectedProduct.price / (1 - selectedProduct.offerPercentage / 100))}
                      </p>
                    )}
                  </div>

                  {selectedProduct.videoUrl && (
                    <div className="md:col-span-2 bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                      <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Video URL
                      </h3>
                      <a
                        href={selectedProduct.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 text-sm sm:text-base break-all"
                      >
                        {selectedProduct.videoUrl}
                      </a>
                    </div>
                  )}

                  {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                    <div className="md:col-span-2 bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                      <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedProduct.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white text-orange-700 text-xs sm:text-sm rounded border border-orange-200 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 sm:pt-4 border-t border-orange-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-3 sm:mb-4">
                    SEO Metadata
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                      <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                        SEO Title
                      </h3>
                      <p className="text-red-800 text-sm sm:text-base">
                        {selectedProduct.seoTitle || "N/A"}
                      </p>
                    </div>
                    <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                      <h3 className="font-semibold text-orange-600 text-sm sm:text-base mb-1 sm:mb-2">
                        Meta Description
                      </h3>
                      <p className="text-red-800 text-sm sm:text-base">
                        {selectedProduct.metaDescription || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-orange-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm sm:text-base rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors shadow hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 border border-orange-200">
            <h2 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="text-orange-600 text-sm sm:text-base mb-4 sm:mb-6">
              Are you sure you want to delete{" "}
              <strong>{productToDelete.productName}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 sm:space-x-4">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setProductToDelete(null);
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-200 text-gray-700 text-sm sm:text-base hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
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

export default ManageProducts;