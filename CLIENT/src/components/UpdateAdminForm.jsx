import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button } from 'react-bootstrap'
import './UpdateAdminForm.css'

const UpdateAdminForm = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('/api/admin/profile')
                const admin = response.data
                setName(admin.name || '')
                setPhone(admin.phone || '')
                setEmail(admin.email || '')
            } catch (error) {
                console.error('Error fetching admin data:', error)
                setError('Error fetching admin data. Please try again later.')
            }
        }

        fetchAdminData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put('/api/admin/profile', { name, phone, email, password })
            Swal.fire({
                icon: 'success',
                title: 'Perfil actualizado',
                text: 'Tus datos se han actualizado exitosamente.',
                confirmButtonText: 'OK'
            })
        } catch (error) {
            console.error('Error updating admin profile:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el perfil. Por favor, intenta nuevamente más tarde.',
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <Container className="adminForm mt-5 bg-secondary text-white" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Actualiza tus datos</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
                        placeholder="Ingresa tu número de teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña:</Form.Label>
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

export default UpdateAdminForm


