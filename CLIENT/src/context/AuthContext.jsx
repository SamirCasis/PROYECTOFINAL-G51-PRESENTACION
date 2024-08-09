import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password })
      const { token, role } = response.data

      localStorage.setItem('token', token)
      setIsAuthenticated(true)
      setRole(role)
      navigate(role === 'admin' ? '/admin' : '/private')
    } catch (error) {
      console.error('Error de inicio de sesión', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setRole('')
    navigate('/login')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get('/api/check-auth', { headers: { Authorization: `Bearer ${token}` } })
          if (response.status === 200) {
            setIsAuthenticated(true)
            setRole(response.data.role)
          }
        } catch (error) {
          console.error('Error al verificar autenticación', error)
        }
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

