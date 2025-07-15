import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import { apiSlice } from '../slices/apiSlice.js'
import currentChannelReducer from './currentChannelSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentChannel: currentChannelReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
