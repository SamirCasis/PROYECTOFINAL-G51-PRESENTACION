import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import '../components/Navigation.css'
import { useAuth } from '../context/AuthContext'

const Navigation = () => {
    const { isAuthenticated, login, logout } = useAuth()

    return (
        <Navbar expand="lg" className="mainNav">
            <NavLink to='/' className='logoHome'>
                <img className='logoNav' src='./logoSAYE.svg' alt='Logo' />
            </NavLink>
            <Container className='col-5'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <>
                                <NavLink to='/private'>
                                    <Button variant="dark" className='btnPerfil'>
                                        PERFIL
                                    </Button>
                                </NavLink>
                                <NavLink to='/carrito'>
                                    <Button variant="secondary">
                                        CARRITO
                                    </Button>
                                </NavLink>
                                <Button variant="danger" onClick={logout}>
                                    SALIR
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/inicia_sesion">
                                    <Button variant="dark" className='btnIniciar' onClick={login}>
                                        INGRESAR <FontAwesomeIcon icon={faUser} />
                                    </Button>
                                </NavLink>
                                <NavLink to='/registro'>
                                    <Button variant="secondary">
                                        REGISTRO <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
