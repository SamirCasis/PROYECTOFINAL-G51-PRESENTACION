import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'react-bootstrap'
import { UserProvider } from './context/UserContext.jsx'
import { PropertiesProvider } from './context/PropertiesContext.jsx'
import CartProvider from './context/CartContext.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PropertiesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </PropertiesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)