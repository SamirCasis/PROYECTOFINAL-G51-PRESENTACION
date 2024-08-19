import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UserContext = createContext()
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  })
  const [error, setError] = useState({ error: false, msg: '', color: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const rol = sessionStorage.getItem('rol')
    const id = sessionStorage.getItem('id')
    const email = sessionStorage.getItem('email')
  
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ token, rol })
      setUserData({ id, email })
    }
  }, [setUser, setUserData])

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const toggleShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword })
  }

  const validateAndRegister = async (e) => {
    e.preventDefault()

    const { name, email, phone, password, confirmPassword } = userData
    const validacionDatos = !name || !email || !phone || !password || !confirmPassword
    const validarPassword = password !== confirmPassword

    if (validacionDatos) {
      setError({
        error: true,
        msg: 'Completa todos los campos',
        color: 'warning',
      })
    } else if (validarPassword) {
      setError({
        error: true,
        msg: 'Las contraseñas no coinciden',
        color: 'danger',
      })
    } else {
      setError({
        error: false,
        msg: 'Cuenta validada!',
        color: 'success',
      })

      try {
        const response = await axios.post(`${API_URL}/api/v1/users/register`, {
          name,
          email,
          phone,
          password,
        })

        if (response.status === 201) {
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario creado con éxito',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }
        navigate('/login')
      } catch (error) {
        console.error('Error al registrar el usuario', error)
        setError({
          error: true,
          msg: 'Error al registrar el usuario',
          color: 'danger',
        })
      }
    }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/users/login`, credentials)
      const { token, rol, id, email } = response.data
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('rol', rol)
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('email', email)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ token, rol })
      setUserData(prev => ({ ...prev, id, email }))
    } catch (error) {
      console.error('Error en login', error)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setUserData({
      id: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
    })
    navigate('/')
  }

  const isAuthenticated = () => !!user

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        handleChange,
        toggleShowPassword,
        validateAndRegister,
        login,
        logout,
        isAuthenticated,
        error,
        setError,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
