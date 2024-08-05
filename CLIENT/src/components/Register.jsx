import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Register = ({ setError }) => {
  const [data, setData] = useState({
    nombre: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const validarDatos = (e) => {
    e.preventDefault();

    const { nombre, email, phone, password, confirmPassword } = data;
    const validacionDatos = !nombre || !email || !phone || !password || !confirmPassword;
    const validarPassword = password !== confirmPassword;

    if (validacionDatos) {
      setError({
        error: true,
        msg: 'Completa todos los campos',
        color: 'warning',
      });
    } else if (validarPassword) {
      setError({
        error: true,
        msg: 'Las contraseñas no coinciden',
        color: 'danger',
      });
    } else {
      setError({
        error: true,
        msg: 'Cuenta validada!',
        color: 'success',
      })
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form className="formulario mt-4" onSubmit={(e) => validarDatos(e)}>
      <Form.Group className='mb-3'>
        <input
          type="text"
          name='nombre'
          className='form-control'
          placeholder='Nombre'
          onChange={handleChange}
          value={data.nombre}
        />
      </Form.Group>
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
          type='number'
          name='phone'
          className='form-control'
          placeholder='Teléfono'
          onChange={handleChange}
          value={data.phone}
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
      <Form.Group className='mb-3 mt-2'>
        <input
          type={showPassword ? 'text' : 'password'}
          name='confirmPassword'
          className='form-control'
          placeholder='Confirmar Contraseña'
          onChange={handleChange}
          value={data.confirmPassword}
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
  )
}

export default Register
