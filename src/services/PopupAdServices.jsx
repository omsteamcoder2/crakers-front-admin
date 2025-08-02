import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// ✅ Get all popup ads
export const getAllPopupAds = async () => {
  const response = await axios.get(`${API}/api/popupad`);
  return response.data.popupAds || response.data; // supports both formats
};

// ✅ Create a new popup ad
export const createPopupAd = async (formData) => {
  const response = await axios.post(`${API}/api/popupad`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Update popup ad by ID
export const updatePopupAd = async (id, formData) => {
  const response = await axios.put(`${API}/api/popupad/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Delete popup ad by ID
export const deletePopupAd = async (id) => {
  const response = await axios.delete(`${API}/api/popupad/${id}`);
  return response.data;
};

// ✅ Toggle popup ad status (active/inactive)
export const togglePopupAdStatus = async (id, newStatus) => {
  const formData = new FormData();
  formData.append("isActive", newStatus);
  const response = await axios.put(`${API}/api/popupad/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
