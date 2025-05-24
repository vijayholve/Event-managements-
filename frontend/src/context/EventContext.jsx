import React, { createContext, useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import isTokenExpired from "../auth/TokenManagement/isTokenExpired";
import refreshAccessToken from "../auth/TokenManagement/refreshAccessToken";
import { API_EVENT } from "../features/base/config";

// Create context
export const EventContext = createContext();

// Provider
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        let access = tokens?.access;

        if (!access || isTokenExpired(access)) {
          console.log("Access token expired, trying to refresh...");
          access = await refreshAccessToken();
        }

        if (!access) {
          console.log("User needs to login again.");
          navigate("/login");
          return;
        }

        const response = await axios.get(API_EVENT.GET_EVENTS, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        setEvents(response.data.data);
        console.log("Fetched events:", response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents, loading, setLoading }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook
export const useEventContext = () => useContext(EventContext);
