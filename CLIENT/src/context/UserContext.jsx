import { createContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const UserContext = createContext()
const URLBASE = "http://localhost:5200"

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  })

  const [error, setError] = useState({
    error: false,
    msg: '',
    color: '',
  })

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
        const response = await axios.post(`${URLBASE}/api/users/register`, {
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

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        handleChange,
        toggleShowPassword,
        validateAndRegister,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }


