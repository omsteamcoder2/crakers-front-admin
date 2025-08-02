import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
    EyeSlash,
  WarningCircle 
} from "phosphor-react";
import {
  getAllPopupAds,
  createPopupAd,
  updatePopupAd,
  deletePopupAd,
  togglePopupAdStatus,
} from "../services/PopupAdServices";

const PopupAdManagement = () => {
  const [popupAds, setPopupAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;
  const [modalImage, setModalImage] = useState(null);

  const [popupForm, setPopupForm] = useState({
    image: null,
    preview: null,
    isActive: true,
  });

  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    fetchPopupAds();
  }, []);

  const fetchPopupAds = async () => {
    try {
      const data = await getAllPopupAds();
      setPopupAds(data);
    } catch (err) {
      setError("Failed to fetch popup ads");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("blob:")) return image;
    return `${API}${image}`;
  };

  const handlePopupImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPopupForm({
        ...popupForm,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const resetPopupForm = () => {
    setPopupForm({
      image: null,
      preview: null,
      isActive: true,
    });
    setEditMode(null);
    setShowForm(false);
  };

const handlePopupSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!editMode && popupAds.length >= 2) {
    setError("You can only add up to 2 popup ads.");
    return;
  }

  setOperationLoading(true);
  try {
    const formData = new FormData();
    formData.append("isActive", popupForm.isActive);
    if (popupForm.image) {
      formData.append("image", popupForm.image);
    }

    if (editMode) {
      await updatePopupAd(editMode, formData);
      setSuccess("Popup ad updated successfully!");
    } else {
      await createPopupAd(formData);
      setSuccess("Popup ad created successfully!");
    }

    fetchPopupAds();
    resetPopupForm();
    setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to save popup ad");
  } finally {
    setOperationLoading(false);
  }
};


  const editPopupAd = (popupAd) => {
    setPopupForm({
      preview: popupAd.image,
      isActive: popupAd.isActive,
    });
    setEditMode(popupAd._id);
    setShowForm(true);
  };

  const handleDeletePopupAd = async (id) => {
    if (window.confirm("Are you sure you want to delete this popup ad?")) {
      try {
        setOperationLoading(true);
        await deletePopupAd(id);
        setSuccess("Popup ad deleted successfully!");
        fetchPopupAds();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError("Failed to delete popup ad");
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleTogglePopupStatus = async (id, currentStatus) => {
    try {
      setOperationLoading(true);
      await togglePopupAdStatus(id, !currentStatus);
      fetchPopupAds();
    } catch (err) {
      setError("Failed to update popup ad status");
    } finally {
      setOperationLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Manage Popup Ads
        </h1>
        {!showForm && popupAds.length < 2 && (
  <button
    onClick={() => setShowForm(true)}
    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm sm:text-base rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
  >
    <Plus size={16} className="mr-1" />
    <span>Add Popup Ad</span>
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

      {/* Popup Ad Form */}
      {showForm && (
        <form
          onSubmit={handlePopupSubmit}
          className="mb-6 sm:mb-8 bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="mb-3">
            <label className="block mb-1 font-medium text-xs sm:text-sm md:text-base text-gray-700">
              Popup Ad Image <span className="text-red-500">*</span>
            </label>
            {popupForm.preview ? (
              <div className="relative mb-2">
                <img
                  src={getImageUrl(popupForm.preview)}
                  alt="Preview"
                  className="w-full max-w-md h-auto max-h-64 object-contain rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setPopupForm({
                      ...popupForm,
                      preview: null,
                      image: null,
                    })
                  }
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Trash size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors inline-flex items-center">
                  <ImageIcon size={14} className="mr-1" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePopupImage}
                    className="hidden"
                    required={!editMode}
                  />
                </label>
                <span className="text-xs text-gray-500">
                  Recommended: 800x600px or similar ratio
                </span>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={popupForm.isActive}
              onChange={(e) =>
                setPopupForm({
                  ...popupForm,
                  isActive: e.target.checked,
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-xs sm:text-sm md:text-base text-gray-700"
            >
              Active Popup Ad
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
                "Update Popup Ad"
              ) : (
                "Create Popup Ad"
              )}
            </button>
            <button
              type="button"
              onClick={resetPopupForm}
              className="border border-orange-300 hover:bg-orange-50 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm md:text-base transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Popup Ad List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <h2 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
            All Popup Ads
          </h2>
        </div>

        {loading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : popupAds.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm sm:text-base">
            No popup ads found. Create your first popup ad.
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
                    Preview
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
                {popupAds.map((popup) => (
                  <tr
                    key={popup._id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      {popup.image ? (
                        <div className="flex items-center">
                          <img
                            src={popup.image}
                            alt="Popup Ad"
                            className="h-10 w-18 sm:h-20 sm:w-32 object-cover rounded-md border border-gray-200"
                          />
                          <button
                            onClick={() => setModalImage(popup.image)}
                            className="ml-2 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                            title="View Full Image"
                          >
                            <Eye size={16} className="sm:size-[16px]" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-16 w-24 sm:h-20 sm:w-32 bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon size={20} className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer hover:opacity-95 transition-opacity">
                        <input
                          type="checkbox"
                          checked={popup.isActive}
                          onChange={() =>
                            handleTogglePopupStatus(popup._id, popup.isActive)
                          }
                          className="sr-only peer"
                          disabled={operationLoading}
                        />
                        <div
                          className={`w-9 md:w-11 h-5 md:h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out
                          ${popup.isActive ? "bg-indigo-600" : "bg-gray-300"} 
                          peer-checked:shadow-inner
                          ${
                            operationLoading
                              ? "opacity-70 cursor-not-allowed"
                              : "peer-active:scale-95"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                            ${
                              popup.isActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </div>
                        <span className="ml-2 text-xs sm:text-sm text-gray-700">
                          {popup.isActive ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDeletePopupAd(popup._id)}
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
          {popupAds.length >= 2 && !showForm && (
  <p className="mt-4 text-sm text-gray-500">
    You have reached the maximum of 2 popup ads.
  </p>
)}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setModalImage(null)} // click outside closes modal
        >
          <div
            className="bg-white rounded-lg p-4 shadow-lg relative max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // prevent inner clicks from closing
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <XCircle size={16} />
            </button>
            <img
              src={modalImage}
              alt="Popup Ad Full View"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </div>
          )}
          {/* Limit Notice */}
<div
  className={`mt-6 p-4 rounded-md text-sm flex items-start gap-2 ${
    popupAds.length > 2
      ? "bg-red-50 border border-red-300 text-red-800"
      : "bg-yellow-50 border border-yellow-300 text-yellow-800"
  }`}
>
  <WarningCircle
    size={20}
    className={`mt-0.5 ${
      popupAds.length > 2 ? "text-red-600" : "text-yellow-600"
    }`}
  />
  <div>
    {popupAds.length > 2 ? (
      <>
        You have added <strong>{popupAds.length}</strong> popup ads, which exceeds the allowed limit of <strong>2</strong>. Please delete some to stay within the limit.
      </>
    ) : (
      <>
        You can add up to <strong>2 popup ads</strong>. You've added{" "}
        <strong>{popupAds.length}</strong>{" "}
        {popupAds.length === 1 ? "popup ad" : "popup ads"}.
      </>
    )}
  </div>
</div>
    </div>
  );
};

export default PopupAdManagement;
