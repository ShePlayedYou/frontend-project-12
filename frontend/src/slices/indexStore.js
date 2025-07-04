import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    initChannels: channelsReducer,
    initMessages: messagesReducer
  },
});

export default store;