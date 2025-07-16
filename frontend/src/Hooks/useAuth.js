import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../slices/authSlice.js'
import { useLoginMutation, useRegisterMutation } from '../slices/authApi.js'

const useAuth = () => {
  const dispatch = useDispatch()

  const [loginRequest] = useLoginMutation()
  const [registerRequest] = useRegisterMutation()

  const logIn = async ({ username, password }) => {
    try {
      const data = await loginRequest({ username, password }).unwrap()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      dispatch(loginSuccess(data))
      return { success: true }
    }
    catch (err) {
      return { success: false, error: err }
    }
  }

  const signUp = async ({ username, password }) => {
    try {
      const data = await registerRequest({ username, password }).unwrap()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      dispatch(loginSuccess(data))
      return { success: true }
    }
    catch (err) {
      return { success: false, error: err }
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    dispatch(logout())
  }

  return { logIn, signUp, logoutUser }
}

export default useAuth
