import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { Provider } from 'react-redux';
import store from './slices/indexStore.js';
import App from './App.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>
)
