import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// Get all categories
export const getAllCategories = async () => {
  const response = await axios.get(`${API}/api/category`);
  return response.data.categories || response.data; // supports both formats
};

// Create a new category
export const createCategory = async (formData) => {
  const response = await axios.post(`${API}/api/category`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update category by ID
export const updateCategory = async (id, formData) => {
  const response = await axios.put(`${API}/api/category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete category by ID
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API}/api/category/${id}`);
  return response.data;
};

// Toggle category status (active/inactive)
export const toggleCategoryStatus = async (id, newStatus) => {
  const formData = new FormData();
  formData.append("isActive", newStatus);
  const response = await axios.put(`${API}/api/category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
