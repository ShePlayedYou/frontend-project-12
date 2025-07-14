import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { PrivatePage } from './Components/PrivateChat.jsx'
import { Page404 } from './Components/Page404.jsx'
import { LoginPage } from './Components/LoginPage.jsx'
import { useSelector } from 'react-redux'
import useAuthInit from './Hooks/useAuthInit.js'
import { Nav } from './Components/Nav.jsx'
import { RegPage } from './Components/Registration.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  const { isInitialized } = useSelector(state => state.auth)

  useAuthInit()

  if (!isInitialized) {
    return null
  }

  const PageOneMain = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth)
    const location = useLocation()

    return (
      isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />
    )
  }

  const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth)
    return isAuthenticated ? <Navigate to="/" replace /> : children
  }

  return (
    <div className="d-flex flex-column h-100">
      <ToastContainer />
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={(
              <PageOneMain>
                <PrivatePage />
              </PageOneMain>
            )}
          />
          <Route
            path="login"
            element={(
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            )}
          />
          <Route
            path="signup"
            element={(
              <PublicRoute>
                <RegPage />
              </PublicRoute>
            )}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
