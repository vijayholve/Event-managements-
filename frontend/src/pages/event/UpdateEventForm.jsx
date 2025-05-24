import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
// import Loading "../../components/loading/Loading"
import { API_ENDPOINTS, API_EVENT } from "../../features/base/config";
const UpdateEventForm = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    start_time: "",
    end_time: "",
    is_public: true,
    banner_image: null,
  });
  const [Dataloading, setDataLoading] = useState(false);

  const [wantsToUpdateImage, setWantsToUpdateImage] = useState(false);
  const [wantsToUpdateDate, setWantsToUpdateDate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch event details to prefill the form
  const fetchEventDetails = async () => {
    try {
      setDataLoading(true);
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const token = tokens?.access;

      const response = await axios.get(`${API_EVENT.GET_EVENTS}${eventId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const event = response.data.data;

      setFormData({
        title: event.title || "",
        description: event.description || "",
        category: event.category || "",
        venue: event.venue || "",
        start_time: event.start_time || "",
        end_time: event.end_time || "",
        is_public: event.is_public ?? true,
        banner_image: null, // File input cannot be prefilled
      });
      setDataLoading(false);
    } catch (error) {
      console.error(error);

      setErrorMessage("❌ Failed to fetch event details.");
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle all form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission to update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const token = tokens?.access;

      const data = new FormData();

      // Append all form fields except banner_image if user doesn't want to update it
      for (const key in formData) {
        if (key === "banner_image" && !wantsToUpdateImage) continue;
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }

      const response = await axios.patch(
        `${API_EVENT.GET_EVENTS}${eventId}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setSuccessMessage("✅ Event updated successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setErrorMessage(
        "❌ Failed to update event. Please try again. " + error.message
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // if (Dataloading) {
  //   return <Loading />;
  // };
  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        ✏️ Update Event
      </h2>

      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center mb-4">{errorMessage}</p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Venue */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" /> Venue
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col md:col-span-2 mt-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="update_date"
              checked={wantsToUpdateDate}
              onChange={() => setWantsToUpdateDate((prev) => !prev)}
              className="mr-2"
            />
            <span>Update Banner Date</span>
          </label>
          {wantsToUpdateDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" /> Start Time
              </label>
              <input
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          )}
        </div>
        {wantsToUpdateDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        )}
        <div className="flex flex-col md:col-span-2 mt-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="update_image"
              checked={wantsToUpdateImage}
              onChange={() => setWantsToUpdateImage((prev) => !prev)}
              className="mr-2"
            />
            <span>Update Banner Image</span>
          </label>

          {wantsToUpdateImage && (
            <input
              type="file"
              name="banner_image"
              onChange={handleChange}
              className="mt-2 rounded-md border-gray-300 shadow-sm"
              required
            />
          )}
        </div>

        {/* Public event checkbox */}
        <div className="flex items-center md:col-span-2 mt-6">
          <input
            type="checkbox"
            name="is_public"
            checked={formData.is_public}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Make event public</label>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
