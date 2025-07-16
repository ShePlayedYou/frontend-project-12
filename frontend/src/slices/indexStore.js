import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import currentChannelReducer from './currentChannelSlice.js'
import { channelsApi } from '../slices/channelsApi.js'
import { messagesApi } from '../slices/messagesApi.js'
import { authApi } from '../slices/authApi.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentChannel: currentChannelReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      channelsApi.middleware,
      messagesApi.middleware,
      authApi.middleware,
    ),
})

export default store
