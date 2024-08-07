import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { Form, Button, Container } from 'react-bootstrap'
import './UpdateForm.css'

const UpdateForm = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone)
    const [password, setPassword] = useState(userData.password)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData({ ...userData, name, email, phone, password })
    }

    return (
        <Container className="updForm mt-5 bg-secondary text-white" style={{ maxWidth: '300px' }}>
            <h2 className="text-center mb-4">Actualiza tus datos</h2>
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
                        type="number" 
                        placeholder="Ingresa nuevo número"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPass">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Ingresa tu email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Actualizar
                </Button>
            </Form>
        </Container>
    )
}

export default UpdateForm
