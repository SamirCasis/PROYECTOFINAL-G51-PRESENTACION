import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import '../components/Navigation.css'

const Navigation = () => {
    return (
        <Navbar expand="lg" className="mainNav">
            <NavLink to='/' className='logoHome'>
                <img className='logoNav' src='./logoSAYE.svg' alt='Logo' />
            </NavLink>
            <Container className='col-5'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/inicia_sesion">
                            <Button variant="dark"  className='btnIniciar'>
                                INGRESAR <FontAwesomeIcon icon={faUser} />
                            </Button>
                        </NavLink>
                        <NavLink to='/registro'>
                            <Button variant="secondary">
                                REGISTRO <FontAwesomeIcon icon={faPen} />
                            </Button>
                        </NavLink>
                        <NavDropdown title="MENU" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                <NavLink to='/carrito'>🛒 Total $</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation


