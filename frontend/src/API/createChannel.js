import axios from 'axios'
import routes from '../routes.js'
import { toast } from 'react-toastify'

export const createChannel = async (channel, t) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(routes.createChannel(), channel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.success(t('toasterMessages.channelCreated'))
    return response
  }
  catch (err) {
    if (err.code === 'ERR_NETWORK') {
      toast.error(t('toasterMessages.networkError'))
      setTimeout(async () => {
        try {
          await axios.post(routes.createChannel(), channel, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          toast.success(t('toasterMessages.channelCreated'))
        }
        catch (retryErr) {
          if (retryErr.code === 'ERR_NETWORK') {
            toast.error(t('toasterMessages.networkError'))
            return
          }
        }
      }, 2000)
    }
  }
}
