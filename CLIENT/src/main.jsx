import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'react-bootstrap'
import { UserProvider } from './context/UserContext.jsx'
import { PropertiesProvider } from './context/PropertiesContext.jsx'
import CartProvider from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <PropertiesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </PropertiesProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);