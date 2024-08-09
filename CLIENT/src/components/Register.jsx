import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UserContext } from '../context/UserContext'

const Register = () => {
  const {
    userData,
    handleChange,
    toggleShowPassword,
    validateAndRegister,
    error,
  } = useContext(UserContext)

  return (
    <Form className="formulario mt-4" onSubmit={validateAndRegister}>
      <Form.Group className='mb-3'>
        <input
          type="text"
          name='name'
          className='form-control'
          placeholder='Nombre'
          onChange={handleChange}
          value={userData.name}
        />
      </Form.Group>
      <Form.Group className='mb-3 mt-2'>
        <input
          type='email'
          name='email'
          className='form-control'
          placeholder='Email'
          onChange={handleChange}
          value={userData.email}
        />
      </Form.Group>
      <Form.Group className='mb-3 mt-2'>
        <input
          type='number'
          name='phone'
          className='form-control'
          placeholder='Teléfono'
          onChange={handleChange}
          value={userData.phone}
        />
      </Form.Group>
      <Form.Group className='mb-3 mt-2'>
        <input
          type={userData.showPassword ? 'text' : 'password'}
          name='password'
          className='form-control'
          placeholder='Contraseña'
          onChange={handleChange}
          value={userData.password}
        />
      </Form.Group>
      <Form.Group className='mb-3 mt-2'>
        <input
          type={userData.showPassword ? 'text' : 'password'}
          name='confirmPassword'
          className='form-control'
          placeholder='Confirmar Contraseña'
          onChange={handleChange}
          value={userData.confirmPassword}
        />
      </Form.Group>
      <Form.Group className="checkbox mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          reverse label="Mostrar contraseña"
          onChange={toggleShowPassword}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Ingresar
      </Button>
      {error.error && (
        <div className={`alert alert-${error.color}`} role="alert">
          {error.msg}
        </div>
      )}
    </Form>
  )
}

export default Register





