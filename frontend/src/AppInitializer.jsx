import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './i18n.js'
import store from './slices/indexStore.js'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT,
}

const AppInitializer = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
)

export default AppInitializer
