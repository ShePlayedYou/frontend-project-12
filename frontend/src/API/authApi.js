import axios from 'axios'
import routes from '../routes.js'
import { toast } from 'react-toastify'

export const handleLogin = async (value, t) => {
  try {
    const response = await axios.post(routes.loginPath(), {
      username: value.username,
      password: value.password,
    })
    return response.data
  }
  catch (err) {
    if (err.code === 'ERR_NETWORK') {
      toast.error(t('toasterMessages.networkError'))
      return null
    }
    throw new Error(t('logInError'))
  }
}

export const handleReg = async (value, t) => {
  try {
    const response = await axios.post(routes.regPath(), {
      username: value.username,
      password: value.password,
    })
    return response.data
  }
  catch (err) {
    console.log(err.code, 'err handleReg')
    if (err.response?.status === 409) {
      throw new Error(t('registerErrors.userExists'))
    }

    if (err.code === 'ERR_NETWORK') {
      toast.error(t('toasterMessages.networkError'))
      return null
    }
  }
}
