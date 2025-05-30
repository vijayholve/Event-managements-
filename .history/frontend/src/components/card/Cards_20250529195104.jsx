import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, API_EVENT } from "../../features/base/config";
import { Navigate, NavLink } from "react-router-dom";
import isTokenExpired from "../../auth/TokenManagement/isTokenExpired";
import refreshAccessToken from "../../auth/TokenManagement/refreshAccessToken";
import {  useEventContext } from "../../context/EventContext";
// 1. Helper: Check if token is expired
import Loading from "../loading/Loading";

refreshAccessToken
const Cards = () => {
  // const [events, setEvents] = useState([]);
  const { filteredEvents, loading } = useEventContext();
  // Only run on mount

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {loading ? (
        <Loading/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <NavLink to={`/events/${event.id}`}
              key={event.id}
              className={`bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300 border relative 
            ${
              event.is_blocked
                ? "border-red-400"
                : "border-gray-200 hover:border-indigo-400"
            }`}
            >
              {event.banner_image && (
                <img
                  src={API_ENDPOINTS.MAIN_URL + event.banner_image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              {/* Title */}
              <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                {event.title}
              </h2>

              {/* Description */}
              <p className="text-gray-700 mb-2">{event.description}</p>

              {/* Metadata */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {event.category || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Venue:</span> {event.venue}
                </p>
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  {new Date(event.start_time).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">End:</span>{" "}
                  {new Date(event.end_time).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Visibility:</span>{" "}
                  {event.is_public ? "Public" : "Private"}
                </p>
              </div>
              {event.is_blocked && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                  Blocked
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;