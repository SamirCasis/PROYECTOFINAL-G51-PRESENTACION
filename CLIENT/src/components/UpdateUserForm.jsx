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
    const userId = userData.id

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5200/api/v1/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                const user = response.data
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
            } catch (error) {
                setError('Error al cargar los datos del usuario')
            }
        }
        fetchUserData()
    }, [userId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedUser = {
            name,
            email,
            phone,
            password
        }

        try {
            const response = await axios.put(`http://localhost:5200/api/v1/users/${userId}`, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                setUserData(updatedUser)
                alert('Usuario actualizado con éxito')
            }
        } catch (error) {
            setError('Error al actualizar el usuario')
        }
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
                        placeholder="Ingresa tu nombre"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Ingresa tu email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Teléfono:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingresa tu nuevo número"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPass">
                    <Form.Label>Nueva Contraseña:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Ingresa tu nueva contraseña"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Actualizar
                </Button>
            </Form>
        </Container>
    )
}

export default UpdateUserForm


