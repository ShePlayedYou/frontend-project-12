import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './slices/indexStore.js'
import App from './App.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'
import './i18n.js'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

const rollbarAccessToken = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN
const rollbarEnvironment = import.meta.env.VITE_ROLLBAR_ENVIRONMENT

const rollbarConfig = {
  accessToken: rollbarAccessToken,
  environment: rollbarEnvironment,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>,
)
