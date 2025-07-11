import axios from 'axios'
import routes from '../routes.js'

export const sendMessage = async (message) => {
  const token = localStorage.getItem('token')
  await axios.post(routes.sendMessage(), message, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
