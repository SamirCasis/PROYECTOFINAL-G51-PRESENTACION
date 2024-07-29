import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../components/Navigation.css'

const Navigation = () => {
    return (
        <Nav>
            <NavLink to='/'> <img className='logoNav' src='./logo SAYE.jpeg' alt='' /> </NavLink>
            <NavLink to="/sesion"><Button variant="primary">Ingresar 😊</Button>{' '}</NavLink>
            <NavLink to="/registro"><Button variant="warning">Registro 😎</Button>{' '}</NavLink>
            <NavLink to="/carrito">🛒 Total $</NavLink>
        </Nav>
    )
}

export default Navigation