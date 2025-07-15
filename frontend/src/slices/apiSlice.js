import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../routes.js'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => ({ url: routes.getChannels() }),
      providesTags: ['Channels'],
    }),
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
    createChannel: builder.mutation({
      query: data => ({
        url: routes.createChannel(),
        method: 'POST',
        body: data,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: routes.editChannel(id),
        method: 'PATCH',
        body: { name },
      }),
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: routes.removeChannel(id),
        method: 'DELETE',
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: routes.loginPath(),
        method: 'POST',
        body: { username, password },
      }),
    }),
    register: builder.mutation({
      query: ({ username, password }) => ({
        url: routes.regPath(),
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useLoginMutation,
  useRegisterMutation,
} = apiSlice
