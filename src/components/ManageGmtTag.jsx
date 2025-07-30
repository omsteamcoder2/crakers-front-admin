// pages/ManageGtmTag.jsx
import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoContent from "../components/NoContent";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ManageGtmTag() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/gtm-tags`);
      setTags(res.data.tags || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching GTM tags:", err);
      setError("Failed to load GTM tags. Please try again.");
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/gtm-tags/${tagToDelete._id}`);
      setTags(tags.filter(tag => tag._id !== tagToDelete._id));
      setConfirmModalOpen(false);
      setTagToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete tag. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full p-2 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage GTM Tags
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Total: {tags.length} tags
          </p>
        </div>
        <button
          onClick={() => navigate("/addgtmtag")}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap shadow-md hover:shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New Tag
        </button>
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

      {tags.length === 0 && !error ? (
        <NoContent
          type={"GTM tags"}
          message="No GTM tags found. Add your first tag!"
        />
      ) : (
        <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Mobile view: Cards */}
          <div className="block sm:hidden">
            {tags.map((tag) => (
              <div
                key={tag._id}
                className="w-full border-b border-gray-200 p-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
              >
                {/* Content */}
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    {tag.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600 capitalize">
                      {tag.location}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {tag.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-start items-center space-y-1 ml-1">
                  <button
                    onClick={() => navigate(`/editgtmtag/${tag._id}`)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="Edit tag"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setTagToDelete(tag);
                      setConfirmModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Delete tag"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tags.map((tag) => (
                  <tr
                    key={tag._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm sm:text-base font-semibold text-gray-800">
                        {tag.name}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-600 capitalize">
                      {tag.location}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs sm:text-sm rounded-full ${
                          tag.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tag.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm sm:text-base font-medium">
                      <div className="flex justify-end space-x-2 sm:space-x-4">
                        <button
                          onClick={() => navigate(`/editgtmtag/${tag._id}`)}
                          className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          aria-label="Edit tag"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setTagToDelete(tag);
                            setConfirmModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-800 p-1 sm:p-2 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Delete tag"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
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

      {/* Confirm Delete Modal */}
      {confirmModalOpen && tagToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Are you sure you want to delete{" "}
              <strong>{tagToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-3 sm:space-x-4">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setTagToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm sm:text-base transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}