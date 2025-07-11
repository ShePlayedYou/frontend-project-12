import axios from 'axios'
import routes from '../routes.js'

export const createChannel = async (channel) => {
  const token = localStorage.getItem('token')
  return axios.post(routes.createChannel(), channel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
