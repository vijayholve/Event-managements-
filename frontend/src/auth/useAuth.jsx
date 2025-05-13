// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user'));
const tokensFromStorage = JSON.parse(localStorage.getItem('tokens'));

const initialState = {
  user: userFromStorage || null,
  tokens: tokensFromStorage || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user info in localStorage
      localStorage.setItem('tokens', JSON.stringify(action.payload.tokens)); // Store token info
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
