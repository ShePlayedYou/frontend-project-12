import axios from 'axios'
import routes from '../routes.js'

export const removeChannel = async (channel) => {
  const token = localStorage.getItem('token')
  const response = axios.delete(routes.removeChannel(channel.id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
