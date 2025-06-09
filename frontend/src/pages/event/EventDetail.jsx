import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  API_ENDPOINTS,
  API_EVENT,
  API_EVENTREGISTER,
} from "../../features/base/config";
import PageLoader from "../../components/loading/PageLoader";
import RatingStar from "../../components/rating/Rate";
import CommentsSection from "../../components/comment/Comments";

const EventDetail = () => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        const access = tokens?.access;

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
        { event: eventId },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
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
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Banner */}
      {event.banner_image && (
        <section className="relative h-[400px] w-full overflow-hidden">
          <img
            src={`${API_ENDPOINTS.MAIN_URL}${event.banner_image}`}
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl sm:text-6xl font-bold mb-2 drop-shadow-xl">
                {event.title}
              </h1>
              <p className="text-lg sm:text-xl">Discover more about this event</p>
            </div>
          </div>
        </section>
      )}

      {/* Main Content + Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left/Main Section */}
        <section className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <article className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About this event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-600 mt-8">
              <div>
                <span className="font-medium">Category:</span>
                <p>{event.category?.name || "N/A"}</p>
              </div>
              <div>
                <span className="font-medium">Venue:</span>
                <p>{event.venue?.name || "N/A"}</p>
              </div>
              <div>
                <span className="font-medium">City:</span>
                <p>{event.city?.name || "N/A"}</p>
              </div>
              <div>
                <span className="font-medium">Start Time:</span>
                <p>{new Date(event.start_time).toLocaleString()}</p>
              </div>
              <div>
                <span className="font-medium">End Time:</span>
                <p>{new Date(event.end_time).toLocaleString()}</p>
              </div>
              <div>
                <span className="font-medium">Public:</span>
                <p>{event.is_public ? "Yes" : "No"}</p>
              </div>
            </div>
          </article>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Organizer Info */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Organized by</h3>
            <p className="text-gray-700">{event.organizer?.username || "Unknown"}</p>
          </section>

          {/* Event Status */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Status</h3>
            <p
              className={`text-sm font-medium ${
                event.is_blocked ? "text-red-600" : "text-green-600"
              }`}
            >
              {event.is_blocked ? "❌ Blocked" : "✅ Active"}
            </p>
          </section>

          {/* Register Button */}
          <div className="text-center">
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
            {msg && <p className="mt-2 text-sm text-gray-600">{msg}</p>}
          </div>
        </aside>
      </main>

      {/* Comments & Ratings - Full Width Below */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        <CommentsSection eventId={eventId} />
        <RatingStar eventId={eventId} />
      </section>
    </div>
  );
};

export default EventDetail;
