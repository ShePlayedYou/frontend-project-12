import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../slices/authSlice.js'

const useAuthInit = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')

    if (token && username) {
      dispatch(loginSuccess({ token, username }))
    }
    else {
      dispatch(logout())
    }
  }, [dispatch])
}

export default useAuthInit
