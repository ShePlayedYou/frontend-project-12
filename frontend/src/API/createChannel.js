import axios from 'axios'
import routes from '../routes.js'

export const createChannel = async (channel, t) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(routes.createChannel(), channel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }
  catch (err) {
    throw err
  }
}
