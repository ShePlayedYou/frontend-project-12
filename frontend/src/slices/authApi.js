import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../routes.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
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
  useLoginMutation,
  useRegisterMutation,
} = authApi
