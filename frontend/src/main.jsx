import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppInitializer from './AppInitializer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppInitializer />
  </StrictMode>
)
