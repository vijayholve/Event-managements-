const MAIN_URL = "http://localhost:8000";
const BASE_URL = "http://localhost:8000/api";


export const API_ENDPOINTS = {
    MAIN_URL: MAIN_URL,

  BASE_URL: BASE_URL,
  REGISTER: `${BASE_URL}/auth/register/`,
  LOGIN: `${BASE_URL}/auth/login/`,
  USER_AUTH: `${BASE_URL}/auth/user/`,
  user_info: `${BASE_URL}/user-info/`,

  // Add more endpoints as needed'http://localhost:8000/api/auth/user/
};
export const API_EVENT = {
  BASE_URL: `${BASE_URL}/events/`,
  GET_EVENTS: `${BASE_URL}/events/events-view/`,
};
export const API_EVENTREGISTER = {
  BASE_URL: `${BASE_URL}/events`,
  VIEW_EVENTREGISTERS: `${BASE_URL}/events/eventregisters-view/`,
};
export const LOCAL_STORAGE_KEYS = {
  TOKENS: "tokens",
};
export const API_USER = {
  BASE_URL: `${BASE_URL}/users/`,
  VIEW_USERS: `${BASE_URL}/users/users-view/`,
};