import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  API_ENDPOINTS,
  API_EVENT,
  API_EVENTREGISTER,
} from "../../features/base/config";
import PageLoader from "../../components/loading/PageLoader";


const EventDetail = () => {
  const { id: eventId } = useParams(); // get event id from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        let access = tokens?.access;

        const response = await axios.get(`${API_EVENT.GET_EVENTS}${eventId}/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    setLoading(true);
    setMsg("");
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const token = tokens?.access;

      const res = await axios.post(
        API_EVENTREGISTER.VIEW_EVENTREGISTERS,
        { event: eventId }, // Send event ID
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201||res.status == 200 ) {
        setMsg("🎉 Registered successfully!");
      } else {
        setMsg("❌ Unexpected response. Try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setMsg("❌ Registration failed. Maybe already registered or server issue.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !event) {
    return <PageLoader reason="Event Detail" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-0">
      {event.banner_image && (
        <div className="relative w-full h-[350px] sm:h-[500px] overflow-hidden group">
          <img
            src={`${API_ENDPOINTS.MAIN_URL}${event.banner_image}`}
            alt="Event Banner"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-sm flex items-end sm:items-center justify-center">
            <div className="text-center px-4 py-6 sm:py-0">
              <h1 className="text-white text-3xl sm:text-5xl font-extrabold drop-shadow-lg">
                {event.title}
              </h1>
              <p className="text-white/80 mt-2 text-sm sm:text-lg font-medium">
                Discover more about this event
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-500 text-sm mb-2">
            Organized by:{" "}
            <span className="font-semibold text-gray-800">
              {event.organizer?.username}
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-gray-700">
            <div>
              <span className="font-semibold block mb-1">Category:</span>
              {event.category || "N/A"}
            </div>
            <div>
              <span className="font-semibold block mb-1">Venue:</span>
              {event.venue}
            </div>
            <div>
              <span className="font-semibold block mb-1">Start Time:</span>
              {new Date(event.start_time).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold block mb-1">End Time:</span>
              {new Date(event.end_time).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold block mb-1">Public:</span>
              {event.is_public ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-semibold block mb-1">Status:</span>
              <span
                className={
                  event.is_blocked
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                }
              >
                {event.is_blocked ? "❌ Blocked" : "✅ Active"}
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Event Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Register Button */}
          <div className="text-center space-y-3">
            <button
              onClick={handleRegister}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
            {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
