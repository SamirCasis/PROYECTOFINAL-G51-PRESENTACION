import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import './UpdateUserForm.css'

const UpdateUserForm = () => {
  const { userData, setUserData } = useContext(UserContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValid, setFormValid] = useState(false)
  const userId = userData.id
  const URLBASE = 'http://localhost:5200/api/v1/users/'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${URLBASE}${userId}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })

        const user = response.data[0] || {}
        setName(user.name || '')
        setEmail(user.email || '')
        setPhone(user.phone || '')
      } catch (error) {
        console.error(error)
        setError('Error al cargar los datos del usuario')
      } finally {
        setLoading(false)
      }
    }
    if (userId != null) {
      fetchUserData()
    } else console.log('revisar id', userId)
  }, [userId])

  useEffect(() => {
    const isValid = name && email && phone && (password || !password)
    setFormValid(isValid)
  }, [name, email, phone, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedUser = {
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(password && { password })
    }

    try {
      const response = await axios.put(`${URLBASE}${userId}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        setUserData({ ...userData, name, email, phone, password })
        alert('Usuario actualizado con éxito')
      }
    } catch (error) {
      console.log('Error updating user:', error)
      setError('Error al actualizar el usuario')
    }
  }

  if (loading) {
    return <p>Cargando datos del usuario...</p>
  }

  return (
    <Container className="updForm mt-5 bg-secondary text-white" style={{ maxWidth: '300px' }}>
      <h2 className="text-center mb-4">Actualiza tus datos</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            placeholder={name || 'Ingresa tu nombre'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder={email || 'Ingresa tu email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="text"
            placeholder={phone || 'Ingresa tu teléfono'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="dejar en blanco si no deseas cambiarla"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!formValid}
        >
          Actualizar
        </Button>
      </Form>
    </Container>
  )
}

export default UpdateUserForm










