import axios from 'axios'
import routes from '../routes.js'

export const renameChannel = async (newChannelName, channel) => {
  const token = localStorage.getItem('token')
  await axios.patch(routes.editChannel(channel.id), newChannelName, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
