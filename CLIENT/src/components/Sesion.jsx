import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sesion.css';

const Login = ({ setError }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

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
            setError({
                error: true,
                msg: 'Inicio de sesión exitoso!',
                color: 'success',
            });
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Form className="formulario mt-4" onSubmit={(e) => validarDatos(e)}>
            <Form.Group className='mb-3 mt-2'>
                <input
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='Email'
                    onChange={handleChange}
                    value={data.email}
                />
            </Form.Group>
            <Form.Group className='mb-3 mt-2'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    className='form-control'
                    placeholder='Contraseña'
                    onChange={handleChange}
                    value={data.password}
                />
            </Form.Group>
            <Form.Group className="checkbox mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    reverse label="Mostrar contraseña"
                    onChange={() => setShowPassword(!showPassword)}
                />
            </Form.Group>
            <Button variant="success" type="submit">
                Ingresar
            </Button>
        </Form>
    );
};

export default Login
