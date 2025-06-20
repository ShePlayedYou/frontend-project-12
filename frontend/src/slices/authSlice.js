import {
    createSlice,
  } from '@reduxjs/toolkit'

  const initialState = {
    username: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isInitialized = true;
      },
      logout: (state) => {
        state.username = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;