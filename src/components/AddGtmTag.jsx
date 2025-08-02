import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGtmTag = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("header");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!name.trim() || !content.trim()) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/gtm-tags`, {
        name,
        location,
        content,
        isActive,
      });

      navigate("/manage-gmt");
    } catch (err) {
      console.error("Error submitting GTM tag:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-gradient-to-b from-red-50 to-orange-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-red-800">
            Add Tracking Script
          </h1>
          <p className="text-sm sm:text-base text-orange-600 mt-1">
            Manage your Google Tag Manager codes
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center mb-6">
          <svg
            className="w-5 h-5 mr-2"
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

      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-orange-200">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <h2 className="text-lg sm:text-xl font-semibold">Script Details</h2>
          <p className="text-sm text-orange-100">Configure your tracking script</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-red-800 mb-2">
              Tag Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2.5 text-sm sm:text-base border border-orange-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g. GTM Header Script"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-red-800 mb-2">
              Placement <span className="text-red-500">*</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-4 py-2.5 text-sm sm:text-base border border-orange-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="header">Header</option>
              <option value="body">Body</option>
              <option value="footer">Footer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-red-800 mb-2">
              Script Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-4 py-2.5 text-sm sm:text-base border border-orange-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
              placeholder="<!-- Paste your GTM script here -->"
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5 text-red-600 border-orange-300 rounded focus:ring-red-500"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm sm:text-base text-red-800"
            >
              Activate this script
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-orange-200">
            <button
              type="button"
              onClick={() => navigate("/manage-gmt")}
              className="px-4 py-2.5 mr-3 text-sm sm:text-base text-red-800 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2.5 text-sm sm:text-base text-white rounded-lg font-medium min-w-[120px] text-center shadow-md hover:shadow-md transition-colors ${
                isSubmitting
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Save Script"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGtmTag;