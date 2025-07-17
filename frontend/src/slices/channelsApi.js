import { createApi } from '@reduxjs/toolkit/query/react'
import routes from '../routes.js'
import { baseQueryWithRedirect } from './baseQueryWithRedirect.js'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: baseQueryWithRedirect,
  tagTypes: ['Channels'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => ({ url: routes.getChannels() }),
      providesTags: ['Channels'],
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
  }),
})

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
