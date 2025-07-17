import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../routesFront.js'

const rawBaseQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')

    if (!username) {
      window.location.assign(routes.frontLoginPath())
      return headers
    }

    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

export const baseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    window.location.assign(routes.frontLoginPath())
  }

  return result
}
