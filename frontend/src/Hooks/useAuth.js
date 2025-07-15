import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice.js'

const useAuth = () => {
  const dispatch = useDispatch()

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    dispatch(logout())
  }

  return { logoutUser }
}

export default useAuth
