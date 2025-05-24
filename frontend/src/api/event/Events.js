import { useEffect, useState } from "react";
import isTokenExpired from "../../auth/TokenManagement/isTokenExpired";
import refreshAccessToken from "../../auth/TokenManagement/refreshAccessToken";
import { Navigate } from "react-router-dom";
import { API_EVENT } from "../../features/base/config";
import axios from "axios";

export const fetchEvents = async ({setEvents,setLoading}) => {
      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));

        let access = tokens?.access;
        if (!access || isTokenExpired(access)) {
          console.log("Access token expired, trying to refresh...");
          access = await refreshAccessToken();
        } else {
          if (!access) {
            console.log("User needs to login again.");
            Navigate("/login");
            return;
          }
          const response = await axios.get(API_EVENT.GET_EVENTS, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          setEvents(response.data.data);
          console.log("Fetched events:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };