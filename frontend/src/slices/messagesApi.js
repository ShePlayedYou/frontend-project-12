import { createApi } from '@reduxjs/toolkit/query/react'
import routes from '../routes.js'
import { baseQueryWithRedirect } from './baseQueryWithRedirect.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithRedirect,
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
