import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../routes.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => ({ url: routes.getMessages() }),
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: message => ({
        url: routes.sendMessage(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi
