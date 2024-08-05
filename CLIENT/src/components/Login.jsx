import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alerta from './Alerta'
import './Login.css'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({ error: false, msg: '', color: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validarDatos = (e) => {
        e.preventDefault();
        const { email, password } = data;

        if (!email || !password) {
            setError({
                error: true,
                msg: 'Completa todos los campos',
                color: 'warning',
            });
        } else {
            if (email === 'admin@example.com' && password === 'admin123') {
                setError({
                    error: false,
                    msg: 'Inicio de sesión como administrador exitoso!',
                    color: 'success',
                });
                navigate('/admin');
            } else if (email === 'user@example.com' && password === 'user123') {
                setError({
                    error: false,
                    msg: 'Inicio de sesión como usuario exitoso!',
                    color: 'success',
                });
                navigate('/private');
            } else {
                setError({
                    error: true,
                    msg: 'Credenciales inválidas',
                    color: 'danger',
                });
            }
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div className="login-container">
            <Alerta error={error} />
            <Form className="formulario mt-4" onSubmit={validarDatos}>
                <Form.Group className="mb-3 mt-2">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                        value={data.email}
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-2">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={data.password}
                    />
                </Form.Group>
                <Form.Group className="checkbox mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        reverse
                        label="Mostrar contraseña"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}

export default Login
