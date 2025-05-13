const BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  BASE_URL : BASE_URL ,
  REGISTER: `${BASE_URL}/auth/register/`,
  LOGIN: `${BASE_URL}/auth/login/`,
  USER_AUTH: `${BASE_URL}/auth/user/`,
  user_info: `${BASE_URL}/user-info/`
  // Add more endpoints as needed'http://localhost:8000/api/auth/user/
};

export const LOCAL_STORAGE_KEYS = {
  TOKENS: 'tokens',
};
