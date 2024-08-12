import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [rol, setRol] = useState('')
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', { email, password })
      const { token, rol } = response.data

      sessionStorage.setItem('token', token)
      setIsAuthenticated(true)
      setRol(rol)
      navigate(rol === 'admin' ? '/admin' : '/usersesion')
    } catch (error) {
      console.error('Error de inicio de sesión', error)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setIsAuthenticated(false)
    setRol('')
    navigate('/')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get('/api/check-auth', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.status === 200) {
            setIsAuthenticated(true)
            setRol(response.data.role)
          } else {
            setIsAuthenticated(false)
            setRol('')
          }
        } catch (error) {
          console.error('Error al verificar autenticación', error)
          setIsAuthenticated(false)
          setRol('')
        }
      } else {
        setIsAuthenticated(false)
        setRol('')
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)





