import axios from 'axios'
import routes from '../routes.js'
import { toast } from 'react-toastify'

export const renameChannel = async (newChannelName, channel) => {
  const token = localStorage.getItem('token')
  try {
    await axios.patch(routes.editChannel(channel.id), newChannelName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (err) {
    throw err
  }
}
