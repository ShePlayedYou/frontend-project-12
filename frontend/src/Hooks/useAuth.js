import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../slices/authSlice.js'
import { handleReg, handleLogin } from '../API/api.js'
import { useTranslation } from 'react-i18next'

const useAuth = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const login = async (values) => {
    const data = await handleLogin(values, t)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    dispatch(loginSuccess(data))
  }

  const register = async (values) => {
    const data = await handleReg(values, t)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    dispatch(loginSuccess(data))
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    dispatch(logout())
  }

  return { login, register, logoutUser }
}

export default useAuth
