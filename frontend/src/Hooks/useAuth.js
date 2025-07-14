import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../slices/authSlice.js'
import { handleReg, handleLogin } from '../API/api.js'

const useAuth = () => {
  const dispatch = useDispatch()

  const login = async (values) => {
    const data = await handleLogin(values)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    dispatch(loginSuccess(data))
  }

  const register = async (values) => {
    const data = await handleReg(values)
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