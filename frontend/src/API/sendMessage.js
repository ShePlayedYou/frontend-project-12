import axios from 'axios'
import routes from '../routes.js'
import { toast } from 'react-toastify'

export const sendMessage = async (message, t) => {
  const token = localStorage.getItem('token')

  try {
    await axios.post(routes.sendMessage(), message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (err) {
    throw err
  }
}
