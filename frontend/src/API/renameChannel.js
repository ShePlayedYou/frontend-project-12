import axios from 'axios'
import routes from '../routes.js'
import { toast } from 'react-toastify'

export const renameChannel = async (newChannelName, channel, t) => {
  const token = localStorage.getItem('token')
  try {
    await axios.patch(routes.editChannel(channel.id), newChannelName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.success(t('toasterMessages.renameChannel'))
  }
  catch (err) {
    if (err.code === 'ERR_NETWORK') {
      toast.error(t('toasterMessages.networkError'))
    }
  }
}
