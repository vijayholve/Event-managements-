import React, { useState } from "react";
import axios from "axios";
import {
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { API_EVENT } from "../../features/base/config";
import { Navigate, useNavigate } from "react-router-dom";

const CreateEventForm = () => {
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

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    // ✅ Append user_id to form data

    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const token = tokens?.access;

      const response = await axios.post(API_EVENT.GET_EVENTS, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "", // ✅ This is correct
        },
      });

      // Log response to check what the backend returns
      console.log("Event API response:", response);

      if (response.status == 201 || response.status == 200) {
        setSuccessMsg("🎉 Event created successfully!");
        setFormData({
          title: "",
          description: "",
          category: "",
          venue: "",
          start_time: "",
          end_time: "",
          is_public: true,
          banner_image: null,
        });
        navigate("/home");
        ("event/create");
      } else {
        throw new Error("Unexpected response from server");
      }

      setSuccessMsg("🎉 Event created successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        venue: "",
        start_time: "",
        end_time: "",
        is_public: true,
        banner_image: null,
      });
    } catch (error) {
      setErrorMsg("❌ Failed to create event. Please try again. " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        📅 Create New Event
      </h2>

      {successMsg && (
        <p className="text-green-600 text-center mb-4">{successMsg}</p>
      )}
      {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <PhotoIcon className="w-4 h-4" /> Event Banner
          </label>
          <input
            type="file"
            name="banner_image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="is_public"
            checked={formData.is_public}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Make event public</label>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
