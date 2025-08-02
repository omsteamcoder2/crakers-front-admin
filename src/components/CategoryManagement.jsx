import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash,
  Image,
  CheckCircle,
  XCircle,
  Plus,
} from "phosphor-react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../services/CategoryServices";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
    preview: null,
    isActive: true,
  });

  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("blob:")) return image;
    return `${API}${image}`;
  };

  const handleCategoryImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryForm({
        ...categoryForm,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      image: null,
      preview: null,
      isActive: true,
    });
    setEditMode(null);
    setShowForm(false);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setOperationLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", categoryForm.name);
      formData.append("description", categoryForm.description);
      formData.append("isActive", categoryForm.isActive);
      if (categoryForm.image) {
        formData.append("image", categoryForm.image);
      }

      if (editMode) {
        await updateCategory(editMode, formData);
        setSuccess("Category updated successfully!");
      } else {
        await createCategory(formData);
        setSuccess("Category created successfully!");
      }

      fetchCategories();
      resetCategoryForm();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save category");
    } finally {
      setOperationLoading(false);
    }
  };

  const editCategory = (category) => {
    setCategoryForm({
      name: category.name,
      description: category.description || "",
      preview: category.image,
      isActive: category.isActive,
    });
    setEditMode(category._id);
    setShowForm(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setOperationLoading(true);
        await deleteCategory(id);
        setSuccess("Category deleted successfully!");
        fetchCategories();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError("Failed to delete category");
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleToggleCategoryStatus = async (id, currentStatus) => {
    try {
      setOperationLoading(true);
      await toggleCategoryStatus(id, !currentStatus);
      fetchCategories();
    } catch (err) {
      setError("Failed to update category status");
    } finally {
      setOperationLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Manage Categories
        </h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm sm:text-base rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-2 sm:p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center text-xs sm:text-sm">
          <XCircle size={16} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 sm:p-3 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center text-xs sm:text-sm">
          <CheckCircle size={16} className="mr-2 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Category Form */}
      {showForm && (
        <form
          onSubmit={handleCategorySubmit}
          className="mb-6 sm:mb-8 bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="mb-3">
            <label className="block mb-1 font-medium text-xs sm:text-sm md:text-base text-gray-700">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium text-xs sm:text-sm md:text-base text-gray-700">
              Description
            </label>
            <textarea
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Enter category description"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium text-xs sm:text-sm md:text-base text-gray-700">
              Image
            </label>
            {categoryForm.preview ? (
              <div className="relative mb-2 inline-block">
                <img
                  src={categoryForm.preview}
                  alt="Preview"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setCategoryForm({
                      ...categoryForm,
                      preview: null,
                      image: null,
                    })
                  }
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Trash size={12} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors inline-flex items-center">
                  <Image size={14} className="mr-1" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImage}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-gray-500">Max 2MB</span>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={categoryForm.isActive}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  isActive: e.target.checked,
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-xs sm:text-sm md:text-base text-gray-700"
            >
              Active Category
            </label>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="submit"
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm sm:text-base rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
              disabled={operationLoading}
            >
              {operationLoading ? (
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
                  {editMode ? "Updating..." : "Creating..."}
                </>
              ) : editMode ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </button>
            <button
              type="button"
              onClick={resetCategoryForm}
              className="border border-orange-300 hover:bg-orange-50 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm md:text-base transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <h2 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
            All Categories
          </h2>
        </div>

        {loading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm sm:text-base">
            No categories found. Create your first category.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-orange-200">
              <thead className="bg-gradient-to-r from-red-50 to-orange-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <Image size={16} className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <div className="text-xs sm:text-sm md:text-base text-gray-900 font-medium">
                        {cat.name}
                      </div>
                      {cat.description && (
                        <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-xs">
                          {cat.description}
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer hover:opacity-95 transition-opacity">
                        <input
                          type="checkbox"
                          checked={cat.isActive}
                          onChange={() =>
                            handleToggleCategoryStatus(cat._id, cat.isActive)
                          }
                          className="sr-only peer"
                          disabled={operationLoading}
                        />
                        <div
                          className={`w-9 md:w-11 h-5 md:h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out
        ${cat.isActive ? "bg-indigo-600" : "bg-gray-300"} 
        peer-checked:shadow-inner
        ${
          operationLoading
            ? "opacity-70 cursor-not-allowed"
            : "peer-active:scale-95"
        }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
          ${cat.isActive ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </div>
                      </label>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => editCategory(cat)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} className="sm:size-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash size={14} className="sm:size-[16px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
