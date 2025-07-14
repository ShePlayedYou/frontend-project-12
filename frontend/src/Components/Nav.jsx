import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAuth from '../Hooks/useAuth.js'

const BuildNav = () => {
  const { t } = useTranslation()

  const { logoutUser } = useAuth()

  const { isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isAuthenticated && (
          <button type="button" onClick={handleLogout} className="btn btn-primary">
            {t('logOutButton')}
          </button>
        )}
      </div>

    </nav>
  )
}

export const Nav = () => BuildNav()
