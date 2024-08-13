import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alerta from './Alerta'
import './Login.css'

const Login = () => {
  const { setUserData, login } = useContext(UserContext)
  const [data, setData] = useState({ email: '', password: '' })
  const [error, setError] = useState({ error: false, msg: '', color: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const validarDatos = async (e) => {
    e.preventDefault()
    const { email, password } = data

    if (!email || !password) {
      setError({
        error: true,
        msg: 'Completa todos los campos',
        color: 'warning'
      })
      return
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError({
        error: true,
        msg: 'Formato de email inválido',
        color: 'warning'
      })
      return
    }

    setLoading(true)

    try {
      await login({ email, password })
      setError({ error: false, msg: 'Inicio de sesión exitoso!', color: 'success' })
      navigate('/')
    } catch (error) {
      setError({ error: true, msg: error.response?.data?.message || 'Error al iniciar sesión', color: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <Alerta error={error} />
      <Form className="formulario mt-4" onSubmit={validarDatos}>
        <Form.Group className="mb-3 mt-2">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={data.email}
          />
        </Form.Group>
        <Form.Group className="mb-3 mt-2">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={data.password}
          />
        </Form.Group>
        <Form.Group className="checkbox mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Mostrar contraseña"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </Form>
    </div>
  )
}

export default Login








