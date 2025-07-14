import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { PrivatePage } from './Components/PrivateChat.jsx'
import { Page404 } from './Components/Page404.jsx'
import { LoginPage } from './Components/LoginPage.jsx'
import { useSelector } from 'react-redux'
import useAuthInit from './Hooks/useAuthInit.js'
import { Nav } from './Components/Nav.jsx'
import { RegPage } from './Components/Registration.jsx'
import { ToastContainer } from 'react-toastify'
import routesFront from './routesFront.js'

function App() {
  const { isInitialized, isAuthenticated } = useSelector(state => state.auth)
  const { frontLoginPath, frontRegPath, frontRootPath, frontNotFoundPath } = routesFront

  useAuthInit()

  if (!isInitialized) {
    return null
  }

  const PrivateRoute = ({ children }) => {
    const location = useLocation()
    return isAuthenticated
      ? children
      : <Navigate to={frontLoginPath()} state={{ from: location }} replace />
  }

  return (
    <div className="d-flex flex-column h-100">
      <ToastContainer />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path={frontRootPath()}
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
          <Route path={frontLoginPath()} element={<LoginPage />} />
          <Route path={frontRegPath()} element={<RegPage />} />
          <Route path={frontNotFoundPath()} element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
